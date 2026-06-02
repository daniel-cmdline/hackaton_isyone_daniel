// src/app/api/scripts/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/db/pool";

export async function GET(req: NextRequest) {
  try {
    const tokenEnviado = req.headers.get("X-Isy-Token");

    if (!tokenEnviado) {
      return NextResponse.json(
        { success: false, error: "Header 'X-Isy-Token' ausente." },
        { status: 400 },
      );
    }

    // Busca os metadados dos scripts diretamente do banco de dados
    const { rows: dbScripts } = await db.query("SELECT filename, description, created_by FROM isy_scripts");

    const scriptsDir = path.join(process.cwd(), "scripts");
    let files: string[] = [];

    if (fs.existsSync(scriptsDir)) {
      files = fs.readdirSync(scriptsDir);
    }

    const shFiles = files.filter((file) => file.endsWith(".sh"));

    const scripts = shFiles.map((file) => {
      const scriptMeta = dbScripts.find((s) => s.filename === file);
      return {
        file,
        desc:
          scriptMeta?.description ||
          "Script executável a nível de Sistema Operacional.",
      };
    });

    return NextResponse.json({ success: true, data: scripts });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
