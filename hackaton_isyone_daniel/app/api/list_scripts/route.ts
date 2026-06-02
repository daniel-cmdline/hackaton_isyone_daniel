// src/app/api/scripts/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/db/pool";

export const dynamic = "force-dynamic";

// Dicionário de fallback para os scripts nativos caso o banco tenha sido resetado
const DEFAULT_METADATA: Record<string, string> = {
  "check_ip.sh":
    "Retorna o endereço IP público (IPv4) da instância via ifconfig.co.",
  "check_dns.sh":
    "Inspeciona a configuração de rede para mapear os servidores DNS em uso.",
  "port_scanner.sh":
    "Realiza uma varredura rápida de portas TCP ativas no localhost.",
  "sys_audit.sh":
    "Auditoria de SO: Kernel, uptime, arquitetura e carga média da CPU.",
  "flush_ram.sh":
    "Força a liberação do cache de memória RAM (PageCache, dentries e inodes).",
  "backup_postgres.sh":
    "Gera um dump completo e compactado do banco de dados PostgreSQL ativo.",
  "check_disk.sh":
    "Verifica o uso e o espaço disponível nas partições de disco do sistema.",
    "check_processes.sh": "Lista os 10 prveriocessos mais consumidores de CPU e memória no momento.",
};  

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
    const { rows: dbScripts } = await db.query(
      "SELECT filename, description, created_by FROM isy_scripts",
    );

    console.log("Metadados dos scripts obtidos do banco:", dbScripts);

    const scriptsDir = path.join(process.cwd(), "scripts");

    console.log("Diretório de scripts:", scriptsDir);
    let files: string[] = [];

    if (fs.existsSync(scriptsDir)) {
      files = fs.readdirSync(scriptsDir);
    }

    const shFiles = files.filter((file) => file.endsWith(".sh"));
    console.log("Scripts .sh encontrados:", shFiles);

    const scripts = shFiles.map((file) => {
      const scriptMeta = dbScripts.find((s) => s.filename === file);
      console.log(`Metadados para ${file}:`, scriptMeta);

      // Se o banco trouxer a string genérica gravada de uma versão, boa
      // senao nós a anulamos para forçar a leitura do dicionário DEFAULT_METADATA.
      let dbDesc = scriptMeta?.description;

      return {
        file,
        desc:
          dbDesc ||
          DEFAULT_METADATA[file] ||
          "Script executável a nível de Sistema Operacional.",
        author: scriptMeta?.created_by || "SYS_ADMIN",
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
