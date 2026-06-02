// src/app/api/tokens/route.ts
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db/pool";
import { authOptions } from "@/app/lib/auth";

// 🔍 GET: Busca os tokens do usuário ou gera o primeiro se a lista estiver vazia
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Não autenticado" },
        { status: 401 },
      );
    }

    const email = session.user.email;

    // Busca os tokens desse usuário no Postgres
    const { rows } = await db.query(
      "SELECT * FROM isy_tokens WHERE user_email = $1",
      [email],
    );

    // Se o cara acabou de logar e não tem NENHUM token, vamos gerar o primeiro automaticamente
    if (rows.length === 0) {
      // Usando UUID v4 nativo padrão para o token inicial
      const tokenMestreInicial = "isy_live_init_" + randomUUID();
      const insertQuery = await db.query(
        "INSERT INTO isy_tokens (name, token, user_email) VALUES ($1, $2, $3) RETURNING *",
        ["Token Inicial Autogerado", tokenMestreInicial, email],
      );
      return NextResponse.json({ success: true, data: insertQuery.rows });
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    console.error("🔥 [FATAL] GET /api/tokens quebrou:", err);
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 },
    );
  }
}

// ➕ POST: Cria um novo token para o usuário no banco
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Não autenticado" },
        { status: 401 },
      );
    }

    const email = session.user.email;

    // Gera um UUID seguro padrão para os novos tokens gerados pelo painel
    const novoHash = "isy_live_" + randomUUID();

    const { name } = await req.json();

    // Conta quantos tokens já existem para este usuário para criar o nome padrão
    const countResult = await db.query(
      "SELECT COUNT(*) as count FROM isy_tokens WHERE user_email = $1",
      [email],
    );
    const currentCount = parseInt(countResult.rows[0].count, 10) || 0;

    const nomeToken = name || `Chave_${currentCount + 1}`;

    const { rows } = await db.query(
      "INSERT INTO isy_tokens (name, token, user_email) VALUES ($1, $2, $3) RETURNING *",
      [nomeToken, novoHash, email],
    );

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (err: any) {
    console.error("🔥 [FATAL] POST /api/tokens quebrou:", err);
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 },
    );
  }
}
