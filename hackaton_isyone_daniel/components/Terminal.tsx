interface TerminalProps {
  output?: string;
  tokenAtivo?: string;
}

export function LiveTerminal({ output, tokenAtivo }: TerminalProps) {
  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-mono group relative">
      {/* Glow cibernético sutil interno nas bordas superiores */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* HEADER DO TERMINAL (ESTILO MAC/LINUX CLI) */}
      <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-3 border-b border-zinc-800/60 flex items-center justify-between select-none">
        {/* Botões de controle da janela */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)] block cursor-pointer hover:bg-rose-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)] block cursor-pointer hover:bg-amber-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)] block cursor-pointer hover:bg-emerald-500 transition-colors" />
        </div>

        {/* Título Centralizado com Metadados */}
        <div className="text-[11px] font-bold text-zinc-400 tracking-tight flex items-center gap-2">
          <span className="inline-block animate-pulse w-1.5 h-1.5 rounded-full bg-indigo-500" />
          isyone@ops-central:~
        </div>

        {/* Status Operacional à Direita */}
        <div className="flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="hidden sm:inline border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 uppercase tracking-widest text-[9px]">
            tty1
          </span>
          <span className="font-semibold text-zinc-400 flex items-center gap-1">
            <span className="text-emerald-500">●</span> LIVE
          </span>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO DO TERMINAL */}
      <div className="relative bg-zinc-950/90 p-5 min-h-[220px] max-h-[400px] overflow-y-auto text-xs leading-relaxed text-zinc-300 selection:bg-indigo-500/30 border-t border-black">
        {/* Efeito Visual: Scanline CRT clássico de hacker */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] opacity-40" />

        {/* Output do Script */}
        <div className="relative z-10 whitespace-pre-wrap font-mono break-all tracking-normal">
          {output ? (
            <div className="text-emerald-400/90 filter drop-shadow-[0_0_2px_rgba(52,211,153,0.2)]">
              {output}
            </div>
          ) : (
            /* Estado Inicial (Aguardando Gatilho) Simulando Shell Bash Real */
            <div className="text-zinc-500 space-y-1">
              <p className="text-zinc-600">
                [SYSTEM] Bash session initiated at{" "}
                {new Date().toLocaleTimeString()}
              </p>
              <p>
                <span className="text-indigo-400">isyone@ops-central</span>:
                <span className="text-purple-400">~</span>$ ./listen_pipeline.sh
              </p>
              {tokenAtivo && (
                <p className="text-zinc-600 mt-1">
                  <span className="text-emerald-500/50">✔</span> Loaded
                  X-Isy-Token: {tokenAtivo.substring(0, 12)}********
                </p>
              )}
              <p className="text-zinc-600 animate-pulse text-[11px] mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-ping" />
                sys:: awaiting script execution trigger...
              </p>
            </div>
          )}

          {/* Cursor Piscando Eternamente na última linha */}
          <span className="inline-block w-2 h-4 ml-1 bg-zinc-400 animate-[pulse_1s_infinite] align-middle" />
        </div>
      </div>

      {/* FOOTER DO TERMINAL COM MÉTRICAS DE REDE */}
      <div className="bg-zinc-900/30 px-4 py-1.5 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-600 font-mono select-none">
        <div>UTF-8 // JSON-Stream</div>
        <div className="flex items-center gap-2">
          <span>Buffer: 0kb</span>
          <span>|</span>
          <span className="font-bold text-zinc-500">FMU_HACK_2026 v1.0.4</span>
        </div>
      </div>
    </div>
  );
}
