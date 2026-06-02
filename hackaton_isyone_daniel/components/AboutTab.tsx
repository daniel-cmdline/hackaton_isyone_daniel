// src/components/AboutTab.tsx
"use client";

export function AboutTab() {
  return (
    <div className="w-full max-w-4xl bg-black border border-zinc-900 p-6 md:p-8 font-mono text-left relative overflow-hidden shadow-2xl rounded-xl">
      {/* Grid de terminal sutil ao fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20"></div>

      {/* Header do Dossiê */}
      <div className="relative z-10 border-b border-zinc-900 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            [SECURITY_CLEARANCE//ROOT] // SYSTEM_ARCHITECT
          </div>
          <h2 className="text-xl font-black text-zinc-100 tracking-tight uppercase">
            SYS_ADM_ROOT // DANIEL CAESAR
          </h2>
        </div>
        <div className="shrink-0 bg-zinc-950 border border-zinc-900 px-3 py-1 text-right text-[11px] text-zinc-500">
          ACCESS_TOKEN: <span className="text-cyan-400 font-bold">GRANTED</span>
        </div>
      </div>

      {/* Layout em Grid: Foto + Metadados + Bio */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA: AVATAR + LINKS */}
        <div className="lg:col-span-4 flex flex-col items-center md:items-stretch gap-4">
          {/* Card da Foto com Brilho de Terminal */}
          <div className="w-full bg-zinc-950 border border-zinc-900 p-6 flex flex-col items-center justify-center rounded-xl relative group">
            <div className="absolute top-2 left-2 text-[8px] text-zinc-700 font-bold uppercase">
              [IMG_RENDER]
            </div>

            {/* Moldura da sua foto */}
            <div className="w-32 h-32 rounded-full border-2 border-cyan-500/30 overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.15)] bg-zinc-900 flex items-center justify-center relative mb-4 group-hover:border-cyan-400 transition-all duration-300">
              <img
                src="/dn.jpg" // ➔ Só dropar sua foto em public/my_avatar.png
                alt="Daniel Caesar Profile"
                className="w-full h-full object-cover opacity-90 brightness-95"
                onError={(e) => {
                  // Fallback estético caso a imagem não carregue no build
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Overlay ciano invisível que acende no hover */}
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <p className="text-[11px] text-zinc-300 font-bold tracking-wider">
              DANIEL CAESAR M.
            </p>
            <p className="text-[9px] text-zinc-600 tracking-widest uppercase mt-0.5">
              @ROOT_OPERATOR
            </p>
          </div>

          {/* Links Sociais Criptografados */}
          <div className="w-full bg-zinc-950 border border-zinc-900 p-4 space-y-2 rounded-xl">
            <p className="text-[9px] font-black text-zinc-600 uppercase border-b border-zinc-900 pb-1">
              // COMMUNICATIONS
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <a
                href="https://github.com/daniel-cmdline" // ➔ Mete teu link real aqui
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] border border-zinc-900 bg-black hover:border-cyan-500/40 p-2 text-center text-zinc-500 hover:text-cyan-400 hover:bg-cyan-950/5 transition-all duration-150 rounded-lg font-bold"
              >
                :: EXTRACT_GITHUB_REPOS
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-mantilha-00b76a361/" // ➔ Mete teu link real aqui
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] border border-zinc-900 bg-black hover:border-cyan-500/40 p-2 text-center text-zinc-500 hover:text-cyan-400 hover:bg-cyan-950/5 transition-all duration-150 rounded-lg font-bold"
              >
                :: SECURE_LINKEDIN_BRIDGE
              </a>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: SYNOPSIS + SKILLS */}
        <div className="lg:col-span-8 space-y-4 w-full">
          {/* Ficha de Cadastro/Bio */}
          <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-3 rounded-xl">
            <p className="text-[9px] font-black text-zinc-600 uppercase border-b border-zinc-900 pb-1">
              // CORE_DOSSIER
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pb-2 border-b border-zinc-900/60 font-sans">
              <p>
                <span className="font-mono text-[10px] text-zinc-600 font-bold">
                  STACK:
                </span>{" "}
                Full-Stack / Infra
              </p>
              <p>
                <span className="font-mono text-[10px] text-zinc-600 font-bold">
                  LOCATION:
                </span>{" "}
                São Paulo, BR
              </p>
              <p>
                <span className="font-mono text-[10px] text-zinc-600 font-bold">
                  SYS_NATIVE:
                </span>{" "}
                Linux Terminal
              </p>
              <p>
                <span className="font-mono text-[10px] text-zinc-600 font-bold">
                  STATUS:
                </span>{" "}
                Active Operator
              </p>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
              Desenvoledor Web e estudante de Segurança Cibernética e Redes,
              focado na arquitetura de automações e resiliência de
              infraestrutura. Orientado a detalhes e na construção de soluções e
              sistemas otimizados. Usuário Linux, sim, com muito orgulho,
              valorizando sempre a integridade de dados e a operação
              tecnológica.
            </p>
          </div>

          {/* Barras de Skills em Formato ASCII */}
          <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-4 rounded-xl">
            <p className="text-[9px] font-black text-zinc-600 uppercase border-b border-zinc-900 pb-1">
              // INFRASTRUCTURE_CAPACITANCE
            </p>

            <div className="space-y-3 text-[11px]">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>TYPESCRIPT / NEXT.JS RUNTIME</span>
                  <span className="text-cyan-400 font-bold">95%</span>
                </div>
                <div className="text-cyan-500/30 tracking-tighter bg-black border border-zinc-900/60 p-0.5 font-bold rounded">
                  [███████████████████░]
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>BACKEND AUTOMATIONS (NODE/ASYNC)</span>
                  <span className="text-cyan-400 font-bold">90%</span>
                </div>
                <div className="text-cyan-500/30 tracking-tighter bg-black border border-zinc-900/60 p-0.5 font-bold rounded">
                  [██████████████████░░]
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>POSTGRESQL RELATIONS & PERSISTENCE</span>
                  <span className="text-cyan-400 font-bold">85%</span>
                </div>
                <div className="text-cyan-500/30 tracking-tighter bg-black border border-zinc-900/60 p-0.5 font-bold rounded">
                  [████████████████░░░░]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
