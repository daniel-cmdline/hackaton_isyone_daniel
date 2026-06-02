// src/components/FrontPage.tsx
"use client";

import { signIn } from "next-auth/react";

export function FrontPage() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center p-4 selection:bg-emerald-500/30 font-mono text-left relative overflow-hidden">
      
      {/* 📺 Efeito de Monitor CRT e Scanlines de Terminal Hacker */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(16,185,129,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none z-50"></div>
      
      {/* Grid de background estético */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      <div className="w-full max-w-3xl bg-black border border-zinc-900 p-6 md:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded-xl">
        
        {/* ⚠️ Listra Zebra de perigo tático no topo */}
        <div className="h-2 w-full bg-[linear-gradient(45deg,#eab308_25%,#000_25%,#000_50%,#eab308_50%,#eab308_75%,#000_75%,#000)] bg-[size:20px_20px] border-b border-zinc-900 -mt-6 md:-mt-10 mb-6 rounded-t-lg"></div>

        {/* Header da Invasão */}
        <div className="border-b border-zinc-900 pb-6 mb-8 relative">
          <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            [GATEWAY_SECURE_NODE] // COCKPIT_AUTH_REQUIRED
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-tight uppercase">
            ISYONE // OPERATIONS_CENTRAL
          </h1>
          <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed max-w-2xl">
            Ambiente de contingência criptografado para orquestração de scripts bash e automações de nível de Kernel. Acesso restrito a operadores autenticados via barramento OAuth 2.0.
          </p>
        </div>

        {/* Matriz de Recursos / Arquitetura Técnica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          
          <div className="p-3 bg-zinc-950/60 border border-zinc-900 flex items-start gap-3 hover:border-emerald-500/20 transition-all duration-200">
            <span className="text-emerald-500 text-sm font-bold mt-0.5">&gt;_</span>
            <div>
              <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">EXEC_MATRIX</h3>
              <p className="text-zinc-500 text-[11px] font-sans mt-0.5 leading-normal">Telemetria assíncrona em tempo real e orquestração direta de rotinas no host.</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/60 border border-zinc-900 flex items-start gap-3 hover:border-emerald-500/20 transition-all duration-200">
            <span className="text-emerald-500 text-sm font-bold mt-0.5">&gt;_</span>
            <div>
              <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">COMPILE_NODE</h3>
              <p className="text-zinc-500 text-[11px] font-sans mt-0.5 leading-normal">Instanciação, validação sintática e catálogo centralizado de automações executáveis.</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/60 border border-zinc-900 flex items-start gap-3 hover:border-emerald-500/20 transition-all duration-200">
            <span className="text-emerald-500 text-sm font-bold mt-0.5">&gt;_</span>
            <div>
              <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">AUTH_KEYPAD</h3>
              <p className="text-zinc-500 text-[11px] font-sans mt-0.5 leading-normal">Geração dinâmica, revogação e controle de tokens de banco com validação por headers.</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/60 border border-zinc-900 flex items-start gap-3 hover:border-emerald-500/20 transition-all duration-200">
            <span className="text-emerald-500 text-sm font-bold mt-0.5">&gt;_</span>
            <div>
              <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">WEBHOOK_TUNNEL</h3>
              <p className="text-zinc-500 text-[11px] font-sans mt-0.5 leading-normal">Túnel de saída integrado ao Discord para alertas automáticos de colapso de hardware.</p>
            </div>
          </div>

        </div>

        {/* Área de Autenticação com o Botão Fera do Google */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col items-center justify-center text-center">
          
          <button
            onClick={() => signIn("google")}
            className="w-full max-w-md px-6 py-3.5 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 text-zinc-100 font-bold text-xs uppercase tracking-widest duration-150 transition-all active:scale-[0.99] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] rounded-lg cursor-pointer"
          >
            {/* 🏎️ LOGO VETORIAL DO GOOGLE INJETADO AQUI */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            AUTENTICAR_VIA_GOOGLE_SSO
          </button>
          
          <div className="w-full max-w-md flex justify-between items-center text-[9px] text-zinc-600 tracking-widest mt-4 uppercase font-bold px-1">
            <span>[PROTOCOL: OAuth 2.0]</span>
            <span className="text-zinc-700">FMU_HACKATHON_2026</span>
            <span>[STATUS: READY]</span>
          </div>
          
        </div>

      </div>
    </div>
  );
}