// src/components/ScriptsTab.tsx
"use client";

interface ScriptsTabProps {
  loading: boolean;
  output: string;
  logs: any[];
  dispararScript: (scriptName: string) => void;
}

export function ScriptsTab({
  loading,
  output,
  logs,
  dispararScript,
}: ScriptsTabProps) {
  // Lista dinâmica de scripts para facilitar adicionar novos e renderizar em loop
  const SCRIPTS = [
    {
      file: "check_ip.sh",
      desc: "Retorna o endereço IP público (IPv4) da instância via ifconfig.co.",
      color: "text-blue-400",
    },
    {
      file: "check_dns.sh",
      desc: "Inspeciona a configuração de rede para mapear os servidores DNS em uso.",
      color: "text-purple-400",
    },
    {
      file: "port_scanner.sh",
      desc: "Realiza uma varredura rápida de portas TCP ativas no localhost.",
      color: "text-red-400",
    },
    {
      file: "sys_audit.sh",
      desc: "Auditoria de SO: Kernel, uptime, arquitetura e carga média da CPU.",
      color: "text-yellow-400",
    },
    {
      file: "flush_ram.sh",
      desc: "Força a liberação do cache de memória RAM (PageCache, dentries e inodes).",
      color: "text-emerald-400",
    },
    {
      file: "matrix_mode.sh",
      desc: "Injeta um fluxo intenso de dados encriptados direto no terminal.",
      color: "text-green-500",
    },
    {
      file: "nuke_cache.sh",
      desc: "Limpeza profunda de todos os caches e arquivos temporários do sistema.",
      color: "text-orange-500",
    },
    {
      file: "crypto_miner.sh",
      desc: "Inicia um worker falso simulando mineração de criptomoedas no terminal.",
      color: "text-cyan-400",
    },
    {
      file: "trace_route.sh",
      desc: "Mapeia os saltos de rede até um servidor externo (Google DNS).",
      color: "text-pink-400",
    },
    {
      file: "kill_zombies.sh",
      desc: "Identifica e encerra processos zumbis que estão consumindo CPU livre.",
      color: "text-rose-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-100">
          Cockpit de Execução Core
        </h2>
        <p className="text-xs text-zinc-400">
          Dispare tarefas e automações diretamente a nível de Sistema
          Operacional.
        </p>
      </div>

      {/* Grid de Scripts Dinâmico */}
      <div className="max-h-[320px] overflow-y-auto pr-2 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SCRIPTS.map((script) => (
            <div
              key={script.file}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div className="mb-4">
                <p
                  className={`font-mono text-sm font-bold flex items-center gap-2 ${script.color}`}
                >
                  <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] bg-current"></span>
                  {script.file}
                </p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {script.desc}
                </p>
              </div>
              <button
                onClick={() => dispararScript(script.file)}
                disabled={loading}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 disabled:text-zinc-500 font-semibold text-sm rounded-lg transition-all"
              >
                {loading ? "Executando..." : "Executar Script"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-zinc-300 font-mono flex items-center gap-2">
          <span>📺</span> Terminal Live Output
        </h3>
        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900 font-mono text-xs text-zinc-300 min-h-[160px] whitespace-pre-wrap overflow-x-auto">
          {output || "Aguardando gatilho de execução de script..."}
        </div>
      </div>

      {/* Histórico de Logs */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-zinc-300 font-mono flex items-center gap-2">
          <span>📊</span> Histórico de Auditoria (Postgres)
        </h3>
        <div className="overflow-x-auto max-h-[300px]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[9px] border-b border-zinc-800 sticky top-0">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Comando</th>
                <th className="p-3">Status</th>
                <th className="p-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-850/40">
                  <td className="p-3 text-zinc-500">#{log.id}</td>
                  <td className="p-3 text-zinc-200 font-semibold">
                    {log.command}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        log.status === "SUCCESS"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                          : "bg-red-950 text-red-400 border border-red-900"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400 text-[11px]">
                    {new Date(log.created_at).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
