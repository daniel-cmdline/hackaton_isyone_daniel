// src/app/api/create_script/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/db/pool";

export async function POST(req: NextRequest) {
  try {
    const tokenEnviado = req.headers.get("X-Isy-Token");

    if (!tokenEnviado) {
      return NextResponse.json(
        { success: false, error: "Header 'X-Isy-Token' ausente." },
        { status: 400 },
      );
    }

    // 1. Valida o token e pega o e-mail do autor da requisição
    const tokenResult = await db.query(
      "SELECT user_email FROM isy_tokens WHERE token = $1",
      [tokenEnviado],
    );

    if (tokenResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Token inválido ou não encontrado." },
        { status: 401 },
      );
    }
    const userEmail = tokenResult.rows[0].user_email;

    const body = await req.json();
    let { filename, description, content } = body;

    if (!filename || !content) {
      return NextResponse.json(
        {
          success: false,
          error: "Nome do arquivo e conteúdo são obrigatórios.",
        },
        { status: 400 },
      );
    }

    // Sanitização para evitar path traversal (impede acessar outras pastas com ../)
    filename = filename.replace(/[^a-zA-Z0-9_.-]/g, "");

    // Garantir extensão .sh
    if (!filename.endsWith(".sh")) {
      filename += ".sh";
    }

    // 2. Valida se o script já existe e quem é o dono dele
    const scriptResult = await db.query(
      "SELECT created_by FROM isy_scripts WHERE filename = $1",
      [filename],
    );

    if (scriptResult.rows.length > 0) {
      const scriptOwner = scriptResult.rows[0].created_by;
      if (scriptOwner && scriptOwner !== userEmail) {
        return NextResponse.json(
          {
            success: false,
            error: "Acesso negado: Este script pertence a outro usuário.",
          },
          { status: 403 },
        );
      }
    }

    const scriptsDir = path.join(process.cwd(), "scripts");

    // Garante que a pasta scripts existe
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }

    const filePath = path.join(scriptsDir, filename);

    // Escreve o arquivo dando permissões de execução automaticamente (0o755 = chmod +x)
    fs.writeFileSync(filePath, content, { encoding: "utf8", mode: 0o755 });

    // 3. Salva ou atualiza os metadados no banco associando ao autor
    const desc =
      description || "Script executável a nível de Sistema Operacional.";
    await db.query(
      `INSERT INTO isy_scripts (filename, description, created_by) 
       VALUES ($1, $2, $3)
       ON CONFLICT (filename) DO UPDATE SET 
         description = EXCLUDED.description,
         updated_at = CURRENT_TIMESTAMP`,
      [filename, desc, userEmail],
    );

    return NextResponse.json({
      success: true,
      message: `Script ${filename} criado com sucesso!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
