// src/components/LogsTab.tsx
"use client";

interface LogsTabProps {
  logs: any[];
}

export function LogsTab({ logs }: LogsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-zinc-300 font-mono flex items-center gap-2">
          <span>📊</span> Histórico de Auditoria (Postgres)
        </h3>
        <div className="overflow-x-auto max-h-[500px]">
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
