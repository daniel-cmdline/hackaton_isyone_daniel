// src/app/api/nuke/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/pool";
import { enviarParaDiscord } from "@/app/utils/enviarParaDiscord";

export async function POST(req: NextRequest) {
  try {
    const tokenEnviado = req.headers.get("X-Isy-Token");

    if (!tokenEnviado) {
      return NextResponse.json(
        { success: false, error: "Acesso negado." },
        { status: 401 },
      );
    }

    // Valida se quem está tentando nukar tem um token legítimo
    const { rows } = await db.query(
      "SELECT * FROM isy_tokens WHERE token = $1",
      [tokenEnviado],
    );
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Privilégios insuficientes." },
        { status: 403 },
      );
    }

    const operadorNome = rows[0].user_email || "OPERADOR_ROOT";

    // 🚨 O DISPARO DO LOG DO FIM DO MUNDO NO DISCORD
    const avisoNuke = `
💥💥💥 [ALERTA DE SEGURANÇA MÁXIMA] 💥💥💥
----------------------------------------------------------------
SINAL DE DESTRUIÇÃO DISPARADO PELO OPERADOR: ${operadorNome}
PROTOCOLO: PURGE_AND_WIPE_EXEC_ROUTE
----------------------------------------------------------------
[SYSTEM] Executando truncamento de chaves criptográficas...
[SYSTEM] Limpando barramento de logs operacionais...
[STATUS] INSTÂNCIA HIGIENIZADA. TODOS OS TOKENS FORAM REVOGADOS.
----------------------------------------------------------------
`;

    // Manda pro Discord antes do banco rodar para garantir que o canal receba o aviso
    await enviarParaDiscord("NUCLEAR_PURGE", "FAILED", operadorNome, avisoNuke);

    // 🔥 O NUKE REAL NO POSTGRES: Limpa os tokens e limpa a tabela de logs
    // Usamos DELETE em vez de DROP para manter as tabelas de pé para os próximos testes
    await db.query("DELETE FROM script_logs");
    await db.query("DELETE FROM isy_tokens");

    return NextResponse.json({
      success: true,
      message: "SYSTEM_PURGED_SUCCESSFULLY",
    });
  } catch (err: any) {
    console.error("[NUKE-ERR]", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
