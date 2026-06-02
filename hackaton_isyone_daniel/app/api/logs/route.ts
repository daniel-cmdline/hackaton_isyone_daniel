import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/pool";

export async function GET(req: NextRequest) {
  // Opcional: Você também pode travar esse endpoint com o X-Isy-Token se quiser segurança total nos logs
  const token = req.headers.get("x-isy-token");
  if (!token) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    // Retorna os últimos 50 scripts executados para não cloggar a rota
    const logs = await db.query(
      `SELECT id, command, status, created_at, left(stdout, 200) as stdout_preview 
       FROM script_logs 
       ORDER BY created_at DESC LIMIT 50`,
    );

    return NextResponse.json({ success: true, data: logs.rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
