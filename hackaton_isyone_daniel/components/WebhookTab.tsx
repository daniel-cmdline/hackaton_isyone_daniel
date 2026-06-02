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
            Sincronize o cockpit da Isyone com o seu servidor do Discord para
            despachar outputs de auditoria e falhas críticas de hardware em
            tempo real.
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
        {/* PASSO 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              01 // ENDPOINT_TARGET
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Acesse as configurações{" "}
              <span className="text-zinc-500">(⚙️ Editar Canal)</span> de um
              canal de texto exclusivo no seu servidor do Discord.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950/60 border border-zinc-900 p-3 text-[11px] text-zinc-600 leading-none">
            <span className="text-zinc-500">discord_app</span> &gt;
            guild_channels &gt;{" "}
            <span className="text-emerald-500/80"># geral</span> &gt; properties
          </div>
        </div>

        {/* PASSO 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              02 // INBOUND_ROUTING
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Navegue até a aba lateral de{" "}
              <span className="text-zinc-300">Integrações</span> e clique no
              container de <span className="text-zinc-300">Webhooks</span>.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950/60 border border-zinc-900 p-3 text-[11px] text-zinc-600 space-y-1">
            <p>
              &gt; checking integrations_matrix...{" "}
              <span className="text-emerald-500/60">OK</span>
            </p>
            <p>
              &gt; hooks_found: [0]{" "}
              <span className="text-indigo-400 hover:underline cursor-pointer">
                [CRIAR_WEBHOOK]
              </span>
            </p>
          </div>
        </div>

        {/* PASSO 03 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              03 // AGENT_GENERATION
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Instancie um novo Webhook. Defina o codinome do bot como{" "}
              <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5">
                Isyone Ops Agent
              </code>{" "}
              e clique em{" "}
              <span className="text-indigo-400 font-bold">
                Copiar URL do Webhook
              </span>
              .
            </p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {/* Bloco do Bot Operacional */}
            <div className="bg-zinc-950 border border-zinc-900 p-4 text-[11px] space-y-2">
              <div className="flex items-center gap-3 bg-black border border-zinc-900 p-2">
                <div className="w-8 h-8 bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center font-black text-emerald-400 text-xs shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-300 font-bold uppercase text-[10px]">
                    Isyone Ops Agent
                  </p>
                  <p className="text-zinc-600 text-[9px] truncate">
                    https://discord.com/api/webhooks/1234567890/ABC...
                  </p>
                </div>
                <span className="text-[9px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 border border-zinc-800">
                  BOT_READY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 04 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border-t border-zinc-950 pt-6">
          <div className="lg:col-span-4 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              04 // ENV_INJECTION
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Abra o arquivo de persistência de variáveis locais na raiz do
              projeto e injete a chave criptográfica conforme o padrão abaixo:
            </p>
          </div>
          <div className="lg:col-span-8 space-y-2">
            <div className="bg-zinc-950 border border-zinc-900 p-3.5 relative group">
              <div className="absolute top-2 right-2 text-[9px] text-zinc-600 uppercase font-bold group-hover:text-zinc-400 duration-150">
                config_file
              </div>
              <p className="text-[10px] text-zinc-500 font-bold mb-1">
                // SYSTEM ENVIRONMENT VARIABLES
              </p>
              <p className="text-[11px] text-emerald-400/90 font-bold select-all break-all pr-12">
                {ENV_STRING}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className={`px-4 py-2 border text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ${
                copied
                  ? "bg-emerald-950/20 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                  : "bg-transparent border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {copied ? "➔ INJECTED_TO_CLIPBOARD" : ":: COPY_ENV_TEMPLATE"}
            </button>
          </div>
        </div>

        {/* 🖼️ SCREENSHOT COM MOLDURA HACKER CENTRALIZADA EMBAIXO */}
        <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:border-emerald-500/20 transition-all duration-300">
          <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>[GUI_RENDER_TARGET] // discord_shot.png</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
          </div>
          <div className="w-full h-auto bg-black border border-zinc-900/60 overflow-hidden rounded-lg">
            <img
              src="/discord_shot.png" // Lembre de dropar em /public com esse nome exato minúsculo
              alt="Discord Interface Screenshot"
              className="w-full h-auto object-contain opacity-90 filter brightness-95"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                console.warn("[ISY-DEBUG] discord_shot.png ausente em public/");
              }}
            />
          </div>
        </div>

        {/* AVISO DE COMPILAÇÃO */}
        <div className="border border-zinc-900/60 bg-zinc-950/40 p-3.5 text-[10px] text-zinc-500 space-y-1 leading-relaxed border-l-2 border-l-indigo-500/50">
          <p className="text-zinc-400 font-bold uppercase flex items-center gap-1.5 text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            [!] REBOOT REQUERIDO
          </p>
          <p className="font-sans">
            Após salvar as alterações no arquivo de ambiente, reinicie a runtime
            do node (
            <code className="bg-zinc-950 border border-zinc-900 px-1 text-[9px]">
              npm run dev
            </code>{" "}
            ou reinicie os containers locais do Docker) para que as rotas de
            execução herdem a ponte de comunicação.
          </p>
        </div>
      </div>
    </div>
  );
}
