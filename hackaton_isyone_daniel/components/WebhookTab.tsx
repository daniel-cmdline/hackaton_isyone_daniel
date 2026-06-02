// src/components/WebhookTab.tsx
"use client";

import { useState } from "react";

export function WebhookTab() {
  const [copied, setCopied] = useState(false);
  const ENV_STRING =
    "DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1234567890/ABC_XYZ_KEY";

  const handleCopy = () => {
    navigator.clipboard.writeText(ENV_STRING);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl bg-black border border-zinc-900 p-6 md:p-8 font-mono text-left relative overflow-hidden shadow-2xl">
      {/* Detalhe estético de background - Grid de terminal */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>

      {/* Header da Seção */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            [MODULE_05] // SUBSYSTEM_INTEGRATION
          </div>
          <h2 className="text-xl font-black text-zinc-100 tracking-tight uppercase">
            Discord Webhook Pipeline
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-sans max-w-xl">
            Monitore o cockpit da Isyone diretamente pelo Discord. Acesse a infraestrutura pública de testes ou siga o manual para espelhar em seu próprio servidor.
          </p>
        </div>
        <div className="shrink-0 bg-zinc-950 border border-zinc-900 px-3 py-2 text-right hidden sm:block">
          <p className="text-[9px] text-zinc-600 font-bold uppercase">
            TUNNEL_STATUS
          </p>
          <p className="text-xs font-bold text-emerald-400 animate-pulse">
            LISTENING_GATILHO
          </p>
        </div>
      </div>

      {/* Conteúdo Central - Passos */}
      <div className="relative z-10 space-y-8">
        
        {/* 🚀 PASSO 01: AGORA NO TOPO - CONEXÃO IMEDIATA PARA A BANCA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start bg-indigo-950/10 border border-indigo-950/40 p-4 rounded-xl">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
              01 // LIVE_BRIDGE_JOIN
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Para validar o funcionamento em tempo real sem perder tempo configurando nada, entre direto no servidor mestre da Isyone.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            <div className="bg-black/60 border border-zinc-900 p-3 relative group">
              <div className="absolute top-2 right-2 text-[9px] text-indigo-500 uppercase font-bold tracking-wider">
                fast_track
              </div>
              <p className="text-[10px] text-zinc-500 font-bold mb-1">
                // TARGET BROADCAST HUB
              </p>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Clique no gatilho abaixo para ingressar no canal operacional. Os disparos do <code className="text-emerald-400 bg-zinc-950 px-1 text-[10px] border border-zinc-900">EXEC_MATRIX</code> e do <code className="text-red-400 bg-zinc-950 px-1 text-[10px] border border-zinc-900">PANIC_BUTTON</code> são espelhados lá instantaneamente.
              </p>
            </div>

            <a
              href="https://discord.gg/P5ndyxaTzb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-all duration-150 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] rounded-lg cursor-pointer"
            >
              :: ENTRAR NO SERVIDOR DISCORD &gt;&gt;
            </a>
          </div>
        </div>

        {/* Linha separadora de contexto */}
        <div className="border-t border-zinc-900/60 pt-2">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
            :: CUSTOM_SELF_HOSTED_SETUP (MANUAL OPCIONAL)
          </p>
        </div>

        {/* PASSO 02 (Antigo 01) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              02 // ENDPOINT_TARGET
            </h3>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Acesse as configurações de um canal de texto exclusivo no seu próprio servidor do Discord.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950/40 border border-zinc-900/50 p-3 text-[11px] text-zinc-600 leading-none select-none">
            <span className="text-zinc-600">discord_app</span> &gt; guild_channels &gt; <span className="text-zinc-700"># geral</span> &gt; properties
          </div>
        </div>

        {/* PASSO 03 (Antigo 02) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              03 // INBOUND_ROUTING
            </h3>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Navegue até a aba de Integrações e clique no container de Webhooks.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950/40 border border-zinc-900/50 p-3 text-[11px] text-zinc-600 space-y-1 select-none">
            <p>&gt; checking integrations_matrix... <span className="text-zinc-700">OK</span></p>
            <p>&gt; hooks_found: [0] <span className="text-zinc-700">[CRIAR_WEBHOOK]</span></p>
          </div>
        </div>

        {/* PASSO 04 (Antigo 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              04 // AGENT_GENERATION
            </h3>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Instancie um novo Webhook, defina o nome como <code className="text-zinc-400 bg-zinc-900 px-1 py-0.5">Isyone Ops Agent</code> e copie a URL gerada.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950/40 border border-zinc-900/50 p-4 text-[11px] space-y-2 opacity-50 select-none">
            <div className="flex items-center gap-3 bg-black border border-zinc-900 p-2">
              <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-zinc-600 text-xs">
                ⚡
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-zinc-500 font-bold uppercase text-[10px]">Isyone Ops Agent</p>
                <p className="text-zinc-700 text-[9px] truncate">https://discord.com/api/webhooks/1234567890/ABC...</p>
              </div>
              <span className="text-[9px] bg-zinc-900 text-zinc-700 px-1.5 py-0.5 border border-zinc-800">BOT_READY</span>
            </div>
          </div>
        </div>

        {/* PASSO 05 (Antigo 04) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              05 // ENV_INJECTION
            </h3>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Insira a chave gerada no arquivo <code className="text-zinc-400 bg-zinc-900 px-1 py-0.5">.env</code> local da sua própria instância.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-2 opacity-50">
            <div className="bg-zinc-950 border border-zinc-900 p-3.5 relative select-none">
              <p className="text-[10px] text-zinc-600 font-bold mb-1">// SYSTEM ENVIRONMENT VARIABLES</p>
              <p className="text-[11px] text-zinc-500 font-bold break-all">
                {ENV_STRING}
              </p>
            </div>
            <button
              disabled
              className="px-4 py-2 border border-zinc-900 text-[10px] font-bold uppercase text-zinc-600 bg-transparent cursor-not-allowed"
            >
              :: COPY_ENV_TEMPLATE
            </button>
          </div>
        </div>

        {/* 🖼️ SCREENSHOT COM MOLDURA HACKER */}
        <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.02)]">
          <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>[GUI_RENDER_TARGET] // discord_shot.png</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
          </div>
          <div className="w-full h-auto bg-black border border-zinc-900/60 overflow-hidden rounded-lg">
            <img
              src="/discord_shot.png"
              alt="Discord Interface Screenshot"
              className="w-full h-auto object-contain opacity-70 filter brightness-90 grayscale"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}