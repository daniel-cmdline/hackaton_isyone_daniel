// src/components/ScriptsTab.tsx
"use client";

import { useEffect, useState } from "react";
import { LiveTerminal } from "./Terminal";

interface ScriptData {
  file: string;
  desc: string;
}

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
  const [scriptsList, setScriptsList] = useState<ScriptData[]>([]);
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
    <div className="space-y-6 font-mono selection:bg-cyan-500/30">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-cyan-500 pl-4 py-1">
        <div>
          <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-1">
            [ MODULE // CORE_EXECUTION_COCKPIT ]
          </div>
          <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
            Cockpit de Execução Core
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed font-sans">
            Dispare tarefas críticas, pipelines e automações assíncronas
            diretamente em nível de Sistema Operacional. Os processos rodam
            isolados no host através da runtime protegida da{" "}
            <span className="text-cyan-400 font-mono">Isyone Engine</span>.
          </p>
        </div>

        <button
          onClick={fetchScripts}
          disabled={loadingScripts}
          className="self-start sm:self-center px-4 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-950 disabled:text-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-zinc-800/80 active:scale-[0.98] transition-all flex items-center gap-2 select-none shrink-0"
        >
          <span
            className={`inline-block text-xs ${loadingScripts ? "animate-spin" : ""}`}
          >
            🔄
          </span>
          {loadingScripts ? "Scanning..." : "Atualizar"}
        </button>
      </div>

      {/* GRID DE SCRIPTS DINÂMICO */}
      <div className="max-h-[340px] overflow-y-auto pr-1 pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {loadingScripts ? (
          <div className="flex flex-col items-center justify-center h-40 bg-zinc-950 rounded-2xl border border-zinc-800/60 shadow-inner gap-3 text-zinc-500 text-xs">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="tracking-widest uppercase text-[10px] font-bold text-zinc-600 animate-pulse">
              Buscando payloads mapeados no SO...
            </span>
          </div>
        ) : scriptsList.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-inner select-none">
            <span className="text-zinc-600 text-xs tracking-wide">
              &gt; Nenhum script executável detectado na partição do host.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {scriptsList.map((script) => (
              <div
                key={script.file}
                className="p-5 bg-zinc-950/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl shadow-xl flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Efeito de luz de fundo ao passar o mouse */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="mb-5 relative z-10">
                  <div className="flex items-center justify-between mb-3 select-none">
                    <p className="font-mono text-xs font-bold flex items-center gap-2 text-zinc-300 group-hover:text-emerald-400 transition-colors tracking-tight">
                      {/* LED piscando */}
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      </span>
                      {script.file}
                    </p>
                    <span className="text-[9px] font-mono text-zinc-600 group-hover:text-emerald-400/80 transition-colors border border-zinc-900 group-hover:border-emerald-500/20 px-2 py-0.5 rounded-md bg-zinc-900/50 tracking-widest font-bold">
                      BASH
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans group-hover:text-zinc-300 transition-colors flex items-start gap-1.5 pl-3.5 border-l border-zinc-900 group-hover:border-emerald-500/20">
                    {script.desc}
                  </p>
                </div>

                <button
                  onClick={() => dispararScript(script.file)}
                  disabled={loading}
                  className="relative z-10 w-full py-2.5 bg-zinc-900/60 border border-zinc-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 text-zinc-400 group-hover:text-emerald-400 disabled:bg-zinc-950 disabled:border-zinc-900/60 disabled:text-zinc-700 font-mono text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-inner"
                >
                  {loading ? (
                    <>
                      <span className="w-3 h-3 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></span>
                      Executando...
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-500 text-[9px] group-hover:animate-pulse">
                        ▶
                      </span>
                      Disparar Payload
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TERMINAL OUTPUT */}
      <LiveTerminal output={output} />
    </div>
  );
}
