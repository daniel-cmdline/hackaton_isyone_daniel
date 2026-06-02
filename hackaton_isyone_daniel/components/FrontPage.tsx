"use client";

import { signIn } from "next-auth/react";

export function FrontPage() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-2xl p-8 md:p-12 bg-zinc-950/40 border border-zinc-800/80 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center backdrop-blur-md relative overflow-hidden group">
        
        {/* Detalhe de luz sutil no fundo */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-violet-500/15 transition-all duration-700" />

        {/* Header */}
        <div className="relative z-10 mb-8">
          <span className="text-5xl mb-4 inline-block drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse">
            ⚡
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-100 font-mono tracking-tighter bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Isyone Ops Central
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto my-4" />
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
            Ambiente restrito de automação e orquestração. Autenticação segura via Single Sign-On é obrigatória.
          </p>
        </div>

        {/* Recursos / "Enchendo a linguiça" com elegância */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-10 max-w-xl mx-auto">
          
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex items-start gap-3 hover:border-zinc-700/60 transition-colors">
            <span className="text-xl p-1.5 bg-zinc-800/50 rounded-lg">📜</span>
            <div>
              <h3 className="text-zinc-200 font-medium text-xs font-mono uppercase tracking-wider">Logs Operacionais</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Telemetria em tempo real e diagnóstico de rotinas de infraestrutura.</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex items-start gap-3 hover:border-zinc-700/60 transition-colors">
            <span className="text-xl p-1.5 bg-zinc-800/50 rounded-lg">⚙️</span>
            <div>
              <h3 className="text-zinc-200 font-medium text-xs font-mono uppercase tracking-wider">Engine de Scripts</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Criação, deploy e catálogo centralizado de automações executáveis.</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex items-start gap-3 hover:border-zinc-700/60 transition-colors">
            <span className="text-xl p-1.5 bg-zinc-800/50 rounded-lg">🔑</span>
            <div>
              <h3 className="text-zinc-200 font-medium text-xs font-mono uppercase tracking-wider">Gestão de Tokens</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Manipulação segura, revogação e controle de credenciais de API.</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl flex items-start gap-3 hover:border-zinc-700/60 transition-colors">
            <span className="text-xl p-1.5 bg-zinc-800/50 rounded-lg">🛡️</span>
            <div>
              <h3 className="text-zinc-200 font-medium text-xs font-mono uppercase tracking-wider">Histórico de Auditoria</h3>
              <p className="text-zinc-500 text-xs mt-0.5">Rastreabilidade completa (Audit Trail) de ações para conformidade.</p>
            </div>
          </div>

        </div>

        {/* Botão de Ação */}
        <div className="relative z-10 max-w-sm mx-auto">
          <button
            onClick={() => signIn("google")}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-zinc-100 font-semibold rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-400/40 active:scale-[0.98] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 text-sm tracking-wide"
          >
            {/* Ícone estilizado simulando o "G" ou login */}
            <span className="text-base bg-white/10 px-2 py-0.5 rounded-md text-xs font-mono font-bold">SSO</span>
            Autenticar com Google Account
          </button>
          
          <span className="text-[10px] text-zinc-600 font-mono mt-4 block tracking-widest uppercase">
            Secured via OAuth 2.0
          </span>
        </div>

      </div>
    </div>
  );
}