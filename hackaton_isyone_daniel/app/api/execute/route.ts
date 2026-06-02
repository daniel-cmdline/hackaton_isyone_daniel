import { NextRequest, NextResponse } from "next/server";
import { execa } from "execa";
import { db } from "@/db/pool"; // Substitua pelo seu arquivo de conexão com o Postgres

export async function POST(req: NextRequest) {
  // 1. Garante a segurança estrita exigida pelo cabeçalho HTTP
  const token = req.headers.get("x-isy-token");

  if (!token) {
    return NextResponse.json(
      { error: "Acesso negado: Cabeçalho X-Isy-Token ausente." },
      { status: 401 },
    );
  }

  // 2. Valida se o token realmente existe e está ativo no Postgres
  // Exemplo usando SQL puro, adapte para seu ORM se preferir
  const tokenCheck = await db.query(
    "SELECT * FROM api_tokens WHERE token_value = $1 AND active = true",
    [token],
  );

  if (tokenCheck.rows.length === 0) {
    return NextResponse.json(
      { error: "Acesso negado: Token inválido ou revogado." },
      { status: 403 },
    );
  }

  // 3. Processa a requisição após validação de segurança
  try {
    const body = await req.json();
    const { scriptName, args } = body; // ex: scriptName: "backup.sh", args: ["--silent"]

    if (!scriptName) {
      return NextResponse.json(
        { error: "scriptName é obrigatório." },
        { status: 400 },
      );
    }

    // Criamos o log inicial com status PENDING no banco
    const logResult = await db.query(
      `INSERT INTO script_logs (command, executed_by_token, status) 
       VALUES ($1, $2, 'RUNNING') RETURNING id`,
      [`${scriptName} ${args?.join(" ") || ""}`, token],
    );
    const logId = logResult.rows[0].id;

    // 4. Executa a nível de S.O. dentro do container
    // IMPORTANTE: Por segurança, aponte sempre para a sua pasta de scripts controlados
    const scriptPath = `./scripts/${scriptName}`;

    try {
      const { stdout, stderr } = await execa("sh", [
        scriptPath,
        ...(args || []),
      ]);

      // Atualiza o log com Sucesso
      await db.query(
        "UPDATE script_logs SET status = $1, stdout = $2, stderr = $3 WHERE id = $4",
        ["SUCCESS", stdout, stderr, logId],
      );

      return NextResponse.json({ success: true, logId, output: stdout });
    } catch (scriptError: any) {
      // Se o script falhar (código de saída diferente de 0)
      await db.query(
        "UPDATE script_logs SET status = $1, stdout = $2, stderr = $3 WHERE id = $4",
        ["FAILED", scriptError.stdout || "", scriptError.message, logId],
      );

      return NextResponse.json(
        { success: false, logId, error: scriptError.message },
        { status: 500 },
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }
}
