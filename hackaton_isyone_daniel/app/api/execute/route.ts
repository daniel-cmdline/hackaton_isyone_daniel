// src/app/api/execute/route.ts
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { db } from "@/db/pool";

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
    const operadorNome = tokenValido.user_email; // O dono do token

    // 2. Executa o Script
    const { scriptName, args } = await req.json();
    if (!scriptName || scriptName.includes("..") || scriptName.includes("/")) {
      return NextResponse.json(
        { success: false, error: "Nome de script inválido." },
        { status: 400 },
      );
    }

    const caminhoScript = path.join(process.cwd(), "scripts", scriptName);
    const argumentosSanitizados = Array.isArray(args) ? args.join(" ") : "";

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
