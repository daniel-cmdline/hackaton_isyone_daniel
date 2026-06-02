// src/components/DbOverviewTab.tsx
"use client";

import { useState, useEffect } from "react";

// Função utilitária para gerar a criptografia PLEY (geometric glyphs)
const generatePleyCrypt = (length: number) => {
  const pleyChars = "▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pleyChars.charAt(Math.floor(Math.random() * pleyChars.length));
  }
  return result;
};

// Hook customizado para gerar o fluxo de PLEY encryption
function usePleyStream(originalText: string, intervalMs = 150) {
  const [encryptedText, setEncryptedText] = useState(originalText);

  useEffect(() => {
    // Inicializa já criptografado
    setEncryptedText(generatePleyCrypt(originalText.length));

    const interval = setInterval(() => {
      setEncryptedText(generatePleyCrypt(originalText.length));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [originalText, intervalMs]);

  return encryptedText;
}

interface DbDataRowProps {
  label: string;
  value: string;
  type: "user" | "token" | "script" | "payload";
}

const DbDataRow = ({ label, value, type }: DbDataRowProps) => {
  const pleyValue = usePleyStream(value);
  const pleyLabel = usePleyStream(label, 300); // Label muda mais devagar

  return (
    <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-900/60 pb-1.5 hover:bg-zinc-950/40 transition-colors px-1">
      <span className="text-zinc-600 uppercase tracking-widest flex items-center gap-1.5 min-w-[140px]">
        {/* Usamos o PLEY_STREAM na label tbm pra ficar full PLEY */}
        {type === "user" && <span className="text-emerald-600">👤</span>}
        {type === "token" && <span className="text-indigo-600">🔑</span>}
        {type === "script" && <span className="text-zinc-500">📄</span>}
        {type === "payload" && <span className="text-emerald-500">📡</span>}
        {pleyLabel}
      </span>
      <span className="text-emerald-400 font-bold truncate select-all">
        {pleyValue}
      </span>
    </div>
  );
};

export function DbOverviewTab() {
  return (
    <div className="w-full max-w-5xl bg-black border border-zinc-900 p-6 md:p-8 font-mono text-left relative overflow-hidden shadow-2xl rounded-2xl">
      {/* Detalhe estético de background - Grid de terminal PLEY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none opacity-40"></div>

      {/* Header do Painel DB */}
      <div className="relative z-10 border-b border-zinc-900 pb-5 mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            [MODULE_10] // SYS_DB_INTEGRITY
          </div>
          <h2 className="text-2xl font-black text-zinc-100 tracking-tight uppercase flex items-center gap-2">
            DATABASE_CORE // <span className="text-emerald-400">PLEY_ENCRYPT_ACTIVE</span>
          </h2>
        </div>
        <div className="shrink-0 bg-zinc-950 border border-zinc-900 px-4 py-2 text-right hidden sm:block rounded-xl">
          <p className="text-[9px] text-zinc-600 font-bold uppercase">SYSTEM_STATE</p>
          <p className="text-xs font-bold text-emerald-400 animate-pulse">FUL_INTEGRATION_OK</p>
        </div>
      </div>

      {/* Layout Principal: 3 Colunas de Criptografia */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* COLUNA 01: USUÁRIOS E TOKENS CORTADOS NO PLEY */}
        <div className="bg-zinc-950/60 border border-zinc-900 p-4 space-y-4 rounded-xl">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">// CRENTIAL_MATRIX//SYMMETRIC_PLEY</p>
            <div className="space-y-1.5 pt-1">
              <DbDataRow label="root_op" value="daniel.caesar@admin.esyone" type="user" />
              <DbDataRow label="audit_agent_01" value="audit@sentry.esyone" type="user" />
              <DbDataRow label="webhook_bridge" value="discord_relay@esyone.internal" type="user" />
              <DbDataRow label="deploy_node" value="kube_ops@esyone.cloud" type="user" />
            </div>
          </div>
          <div className="space-y-1 pt-2 border-t border-zinc-900">
            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">// AUTH_KEYPAD//ASYMMETRIC_PLEY</p>
            <div className="space-y-1.5 pt-1">
              <DbDataRow label="master_key" value="isy_tkn_88ff9a_supersecret_pley" type="token" />
              <DbDataRow label="deploy_agent" value="tkn_dep_4321_pley_node" type="token" />
              <DbDataRow label="discord_hook" value="webhook_tkn_9911_pley_hub" type="token" />
            </div>
          </div>
        </div>

        {/* COLUNA 02: PLEY_CORE CUBE VISUALIZATION */}
        <div className="bg-black/60 border border-zinc-900 p-3 rounded-xl flex flex-col items-center justify-center min-h-[300px] relative">
          <div className="absolute top-2 left-2 text-[8px] text-zinc-700 font-bold uppercase tracking-wider">
            [PLEY_CORE//IMG_RENDER]
          </div>
          {/* MOCKUP DO CUBO DE DADOS PLEY */}
          <div className="w-48 h-48 bg-zinc-950 border border-emerald-500/30 rounded-2xl flex items-center justify-center relative shadow-[0_0_60px_rgba(16,185,129,0.15)] group transition-all duration-500 hover:border-emerald-400">
            {/* O Cubo em si, full PLEY */}
            <div className="w-40 h-40 bg-black border border-emerald-500/20 rounded-lg flex flex-col items-center justify-center font-black text-emerald-400 text-6xl shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl text-emerald-300">PLEY</span>
              <span className="text-[10px] tracking-widest text-emerald-600 mt-2">ENCRYPT</span>
            </div>
            {/* Overlay verde que pisca no hover */}
            <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
          </div>
          <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-4 font-black">CORE_PLEY_NODE_ACTIVE</p>
          <p className="text-xs text-emerald-400 font-bold animate-pulse mt-1 select-all">{usePleyStream("INTEGRITY_MATRIX_SECURE", 100)}</p>
        </div>

        {/* COLUNA 03: SCRIPTS E PAYLOADS INFESTADOS DE PLEY */}
        <div className="bg-zinc-950/60 border border-zinc-900 p-4 space-y-4 rounded-xl">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">// SCRIPT_REPO//BLOCK_HASH_PLEY</p>
            <div className="space-y-1.5 pt-1">
              <DbDataRow label="kernel_panic.sh" value="sha256_pley_f00d88ab_segfault" type="script" />
              <DbDataRow label="deploy_isy.py" value="sha256_pley_badd_c0de_deploy" type="script" />
              <DbDataRow label="audit_core.js" value="sha256_pley_9911aabb_audit" type="script" />
            </div>
          </div>
          <div className="space-y-1 pt-2 border-t border-zinc-900">
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">// NET_BRIDGE//AES_PLEY_STREAM</p>
            <div className="space-y-1.5 pt-1">
              <DbDataRow label="discord_payload" value="{'event':'kernel_panic', 'origin':'root_node'}" type="payload" />
              <DbDataRow label="audit_metrics" value="{'cpu':'98%', 'mem':'9.1gb', 'threat':'CRIT_0'}" type="payload" />
            </div>
          </div>
        </div>

      </div>

      {/* Rodapé de Status */}
      <div className="border-t border-zinc-900 pt-6 mt-8 text-center">
        <p className="text-xs text-zinc-500 font-sans tracking-tight max-w-2xl mx-auto">
          O Cockpit da Isyone está <span className="text-emerald-400 font-bold">100% integrado</span>. O DB_OVERVIEW utiliza o barramento de criptografia <code className="bg-zinc-950 border border-zinc-900 px-1 text-[11px]">PLEY</code> para garantir a integridade total dos dados sensíveis. Nenhuma informação legível é trafegada fora da bolha de segurança ROOT.
        </p>
      </div>

    </div>
  );
}