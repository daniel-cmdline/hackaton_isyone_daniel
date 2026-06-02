// src/components/ScriptsTab.tsx
"use client";

import { useEffect, useState } from "react";
import { LiveTerminal } from "./Terminal";

interface ScriptsTabProps {
  loading: boolean;
  output: string;
  dispararScript: (scriptName: string) => void;
  tokenAtivo: string;
}

export function ScriptsTab({
  loading,
  output,
  dispararScript,
  tokenAtivo,
}: ScriptsTabProps) {
  const [scriptsList, setScriptsList] = useState<any[]>([]);
  const [loadingScripts, setLoadingScripts] = useState(true);

  const fetchScripts = async () => {
    if (!tokenAtivo) return;

    setLoadingScripts(true);
    try {
      const res = await fetch("/api/list_scripts", {
        headers: {
          "X-Isy-Token": tokenAtivo,
        },
      });
      const data = await res.json();
      if (data.success) setScriptsList(data.data);
    } catch (err) {
      console.error("Erro ao carregar scripts:", err);
    } finally {
      setLoadingScripts(false);
    }
  };

  useEffect(() => {
    if (tokenAtivo) {
      fetchScripts();
    }
  }, [tokenAtivo]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">
            Cockpit de Execução Core
          </h2>
          <p className="text-xs text-zinc-400">
            Dispare tarefas e automações diretamente a nível de Sistema
            Operacional.
          </p>
        </div>
        <button
          onClick={fetchScripts}
          disabled={loadingScripts}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-lg border border-zinc-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <span className={loadingScripts ? "animate-spin inline-block" : ""}>
            🔄
          </span>{" "}
          Atualizar
        </button>
      </div>

      {/* Grid de Scripts Dinâmico */}
      <div className="max-h-[320px] overflow-y-auto pr-2 pb-2">
        {loadingScripts ? (
          <div className="flex items-center justify-center h-32 gap-3 text-zinc-400 text-sm">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Buscando scripts disponíveis no SO...</span>
          </div>
        ) : scriptsList.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-zinc-900 border border-zinc-800 rounded-xl">
            <span className="text-zinc-500 text-sm">
              Nenhum script encontrado na pasta.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {scriptsList.map((script) => (
              <div
                key={script.file}
                className="p-5 bg-zinc-950/50 backdrop-blur-sm border border-zinc-800/80 rounded-xl shadow-lg flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Efeito de luz de fundo ao passar o mouse */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="mb-5 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-sm font-bold flex items-center gap-2.5 text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {/* LED piscando */}
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      </span>
                      {script.file}
                    </p>
                    <span className="text-[9px] font-mono text-zinc-600 group-hover:text-emerald-500/70 transition-colors border border-zinc-800 group-hover:border-emerald-500/30 px-2 py-0.5 rounded bg-zinc-900/50 tracking-wider">
                      BASH
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors flex items-start gap-1.5">
                    <span className="text-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity font-mono mt-0.5">
                      $
                    </span>
                    {script.desc}
                  </p>
                </div>

                <button
                  onClick={() => dispararScript(script.file)}
                  disabled={loading}
                  className="relative z-10 w-full py-2.5 bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 text-zinc-300 group-hover:text-emerald-400 disabled:bg-zinc-950 disabled:border-zinc-800 disabled:text-zinc-600 font-mono text-[11px] uppercase tracking-widest font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></span>{" "}
                      Em Execução...
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-500 group-hover:animate-pulse">
                        ▶
                      </span>{" "}
                      Disparar
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal Output */}
      <LiveTerminal output={output} />
    </div>
  );
}
