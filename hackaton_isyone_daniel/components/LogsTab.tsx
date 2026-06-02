// src/components/LogsTab.tsx
"use client";

interface LogData {
  id: string | number;
  command: string;
  status: "SUCCESS" | string;
  created_at: string | Date;
}

interface LogsTabProps {
  logs: LogData[];
}

export function LogsTab({ logs }: LogsTabProps) {
  // Contadores simples para inflar o visual do painel hacker
  const totalLogs = logs.length;
  const failureCount = logs.filter((l) => l.status !== "SUCCESS").length;

  return (
    <div className="space-y-6 font-mono selection:bg-indigo-500/30">
      
      {/* CABEÇALHO DO MÓDULO */}
      <div className="border-l-2 border-purple-500 pl-4 py-1">
        <div className="text-[10px] text-purple-400 font-bold tracking-widest uppercase mb-1">
          [ MODULE // AUDIT_TRAIL ]
        </div>
        <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
          Histórico de Auditoria Geral
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed font-sans">
          Rastreabilidade imutável de eventos armazenados no cluster relacional. Toda injeção de payload ou chamada de Isy Token gera uma entrada de telemetria assinada.
        </p>
      </div>

      {/* METRIC BADGES (LARGURA TOTAL) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 select-none">
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/60 shadow-inner">
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Database Node</div>
          <div className="text-xs font-bold text-zinc-300 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PostgreSQL 16.2
          </div>
        </div>
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/60 shadow-inner">
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Total Streams</div>
          <div className="text-xs font-bold text-indigo-400 mt-1">{totalLogs} events</div>
        </div>
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/60 shadow-inner">
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Security Anomalies</div>
          <div className={`text-xs font-bold mt-1 ${failureCount > 0 ? "text-rose-400 animate-pulse" : "text-zinc-400"}`}>
            {failureCount} exceptions
          </div>
        </div>
        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/60 shadow-inner">
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Sync Pipeline</div>
          <div className="text-xs font-bold text-purple-400 mt-1">REALTIME_STREAM</div>
        </div>
      </div>

      {/* CONSOLE / TABELA DE LOGS */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative group">
        
        {/* Barra superior de identificação do Stream */}
        <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2.5 border-b border-zinc-800/60 flex items-center justify-between select-none text-[10px]">
          <div className="flex items-center gap-2 text-zinc-400 font-bold">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            STDOUT // TRANSACTION_LOGS
          </div>
          <div className="text-zinc-600 text-[9px] uppercase tracking-wider">
            Buffer: Stable
          </div>
        </div>

        {/* Container Scrollável */}
        <div className="overflow-x-auto max-h-[480px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-950 text-zinc-500 uppercase text-[9px] font-bold tracking-widest border-b border-zinc-900 sticky top-0 z-10 shadow-md select-none">
              <tr>
                <th className="p-3.5 pl-5 w-20 text-center">HEX_ID</th>
                <th className="p-3.5">TARGET_COMMAND_BUFFER</th>
                <th className="p-3.5 w-32 text-center">STATUS_SIG</th>
                <th className="p-3.5 pr-5 w-48 text-right">TIMESTAMP_LOCAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-600 text-xs">
                    &gt; No transactional inputs found in this node. Pipeline empty.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-zinc-900/40 transition-colors border-zinc-900 group/row"
                  >
                    {/* ID formatado como HEX/Index de Log */}
                    <td className="p-3.5 pl-5 text-center text-zinc-600 font-mono text-[11px] group-hover/row:text-zinc-400 transition-colors">
                      [{String(log.id).padStart(3, "0")}]
                    </td>
                    
                    {/* Comando / Bash Payload */}
                    <td className="p-3.5 text-xs text-zinc-300 font-mono font-medium tracking-tight break-all">
                      <span className="text-zinc-600 mr-1.5 select-none">$</span>
                      <span className="bg-zinc-900/60 border border-zinc-800/40 px-2 py-1 rounded text-zinc-100 font-mono text-[11px] font-bold shadow-inner">
                        {log.command}
                      </span>
                    </td>
                    
                    {/* Status Badge Customizado */}
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase select-none ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                            : "bg-rose-950/40 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.05)] animate-pulse"
                        }`}
                      >
                        {log.status === "SUCCESS" ? "● OK" : "⚡ ERR"}
                      </span>
                    </td>
                    
                    {/* Timestamp do Kernel */}
                    <td className="p-3.5 pr-5 text-right text-zinc-500 font-mono text-[10px] tracking-tighter group-hover/row:text-zinc-400 transition-colors">
                      {new Date(log.created_at).toLocaleString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé técnico da tabela */}
        <div className="bg-zinc-900/20 px-4 py-2 border-t border-zinc-900 text-[10px] text-zinc-600 flex justify-between items-center select-none">
          <div>Query executed over primary indexing</div>
          <div>FMU_AUDIT_STATION // 2026</div>
        </div>

      </div>
    </div>
  );
}