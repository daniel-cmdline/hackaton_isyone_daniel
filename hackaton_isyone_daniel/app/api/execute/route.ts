// src/app/api/execute/route.ts
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { db } from "@/db/pool";
// 📥 Importando a sua função dedicada de Webhook
import { enviarParaDiscord } from "@/app/utils/enviarParaDiscord";

export async function POST(req: NextRequest) {
  try {
    // 1. Pega o token enviado obrigatoriamente pelo browser
    const tokenEnviado = req.headers.get("X-Isy-Token");

    if (!tokenEnviado) {
      return NextResponse.json(
        { success: false, error: "Header 'X-Isy-Token' ausente." },
        { status: 400 },
      );
    }

    // 🔐 VALIDACÃO GOD: Checa em tempo real se o token existe no Postgres
    const { rows } = await db.query(
      "SELECT * FROM isy_tokens WHERE token = $1",
      [tokenEnviado],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "X-Isy-Token inválido ou revogado no banco." },
        { status: 401 },
      );
    }

    const tokenValido = rows[0];
    // Extrai o operador dono do token para auditar no log e no Discord
    const operadorNome =
      tokenValido.user_email ||
      `Painel (Token: ${tokenEnviado.substring(0, 12)}...)`;

    // 2. Executa o Script
    const { scriptName, args } = await req.json();
    if (!scriptName || scriptName.includes("..") || scriptName.includes("/")) {
      return NextResponse.json(
        { success: false, error: "Nome de script inválido." },
        { status: 400 },
      );
    }

    // 💣 HARDCODE: Cláusula exclusiva para forçar falha no fail.sh e registrar no banco
    if (scriptName === "fail.sh") {
      const outputErro = `
${"\u001b[31m"}████████  ██████  ████████  ██████  ██       ██     ████████ 
██       ██    ██    ██    ██    ██ ██       ██     ██       
██████   ████████    ██    ████████ ██       ██     ██████   
██       ██    ██    ██    ██    ██ ██       ██     ██       
██       ██    ██    ██    ██    ██ ████████ ██████ ████████ ${"\u001b[0m"}

----------------------------------------------------------------
${"\u001b[33m"}[⚠️ WARNING] SINAL DE HARDWARE DETECTADO: SIGSEGV (0x0000000B)${"\u001b[0m"}
${"\u001b[31m"}🔥 [FATAL] Execução abortada intencionalmente.${"\u001b[0m"}
${"\u001b[31m"}[STDERR] Falha de segmentação (core dumped)${"\u001b[0m"}
----------------------------------------------------------------

• [KERNEL] Descarregando stack trace para /var/log/dump.core...
• [KERNEL] Registos de memória corrompidos na flag do operador.

${"\u001b[35m"}ℹ️ O script foi instruído a falhar pelo utilizador ROOT.${"\u001b[0m"}
${"\u001b[31m"}[PROCESS TERMINATED WITH EXIT CODE 139]${"\u001b[0m"}
----------------------------------------------------------------
`;

      try {
        await db.query(
          "INSERT INTO script_logs (command, status, output, operator) VALUES ($1, $2, $3, $4)",
          [
            scriptName,
            "FAILED",
            outputErro,
            `Painel (Token: ${tokenEnviado.substring(0, 12)}...)`,
          ],
        );
      } catch (dbErr) {
        console.error(dbErr);
      }

      // 🔥 DISPARO NATIVO DO DISCORD (FALHA FORÇADA)
      enviarParaDiscord(scriptName, "FAILED", operadorNome, outputErro);

      return NextResponse.json({
        success: false,
        error: outputErro,
        output: outputErro,
      });
    }

    const caminhoScript = path.join(process.cwd(), "scripts", scriptName);
    const argumentosSanitizados = Array.isArray(args) ? args.join(" ") : "";

    try {
      const { execSync } = require("child_process");
      execSync(`chmod +x "${caminhoScript}"`);
    } catch (permErr) {
      console.error("⚠️ Falha ao tentar forçar chmod automágico:", permErr);
    }

    const resultadoExecucao = await new Promise<{
      success: boolean;
      output: string;
    }>((resolve) => {
      exec(
        `${caminhoScript} ${argumentosSanitizados}`,
        async (error, stdout, stderr) => {
          const outputCompleto = stdout + stderr;
          const statusFinal = error ? "FAILED" : "SUCCESS";

          // Grava o log de auditoria
          try {
            await db.query(
              "INSERT INTO script_logs (command, status, output, operator) VALUES ($1, $2, $3, $4)",
              [
                scriptName,
                statusFinal,
                outputCompleto,
                `Painel (Token: ${tokenEnviado.substring(0, 12)}...)`,
              ],
            );
          } catch (dbErr) {
            console.error(dbErr);
          }

          // 🔥 DISPARO NATIVO DO DISCORD (EXECUÇÃO REAL)
          enviarParaDiscord(
            scriptName,
            statusFinal,
            operadorNome,
            outputCompleto,
          );

          resolve({ success: !error, output: outputCompleto });
        },
      );
    });

    return NextResponse.json(resultadoExecucao);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
