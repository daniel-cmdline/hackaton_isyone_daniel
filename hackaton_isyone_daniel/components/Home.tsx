export function WelcomeCard() {
  // Arte ASCII estilizada "OPS" para o clima de Hackathon
  const asciiArt = `
██╗███████╗██╗   ██╗ ██████╗ ███╗   ██╗███████╗
██║██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔════╝
██║███████╗ ╚████╔╝ ██║   ██║██╔██╗ ██║█████╗  
██║╚════██║  ╚██╔╝  ██║   ██║██║╚██╗██║██╔══╝  
██║███████║   ██║   ╚██████╔╝██║ ╚████║███████╗
╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  `;

  return (
    <div className="relative bg-zinc-950 p-8 md:p-12 rounded-3xl border border-zinc-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center min-h-[480px] text-center overflow-hidden group">
      
      {/* Linhas de grade de fundo estilo "Cyberpunk" */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      
      {/* Efeito Glow Roxo/Azul no fundo */}
      <div className="absolute -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-500" />

      {/* Seção ASCII Art com Degradê Cyberpunk */}
      <div className="relative z-10 font-mono text-[7px] sm:text-[9px] leading-tight whitespace-pre bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent opacity-90 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] mb-6 select-none font-bold tracking-widest animate-pulse">
        {asciiArt}
      </div>

      {/* Badge do Hackathon */}
      <div className="relative z-10 flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-4 shadow-inner">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
          ⚡ Hackathon FMU 2026 // Active Session
        </span>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-3 font-mono tracking-tighter">
          Isyone <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Ops Central</span>
        </h2>
        
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6">
          Sua central de orquestração está pronta. Use o terminal lateral para injetar scripts, monitorar logs ou gerar novos <span className="text-indigo-400 font-mono">Isy Tokens</span>.
        </p>

        {/* Console Helper (Simulação de terminal/Dica de uso) */}
        <div className="bg-zinc-900/60 border border-zinc-800/60 font-mono text-xs rounded-xl p-3.5 text-left text-zinc-500 max-w-sm mx-auto backdrop-blur-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <p className="text-zinc-400">
            <span className="text-indigo-500">$</span> ops-central --status
          </p>
          <p className="text-emerald-400/90 text-[11px] mt-1">
            &gt; Ready. Awaiting sidebar navigation...
          </p>
        </div>
      </div>
      
    </div>
  );
}