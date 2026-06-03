// src/components/PanicTab.tsx
"use client";

import { useState, useEffect } from "react";

interface PanicTabProps {
  tokenAtivo: string;    
  onNukeComplete: () => void; 
}

export function PanicTab({ tokenAtivo, onNukeComplete }: PanicTabProps) {
  const [isAborting, setIsAborting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [glitchText, setGlitchText] = useState("CORE_PURGE");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isAborting) return;
    const codes = ["WIPING_LOGS", "MEM_DUMP_0x0F", "SYS_OVERLOAD", "DESTROY_SESSION", "DISCORD_ALERT_0"];
    const interval = setInterval(() => {
      setGlitchText(codes[Math.floor(Math.random() * codes.length)]);
    }, 150);
    return () => clearInterval(interval);
  }, [isAborting]);

  const handlePanicTrigger = async () => {
    if (!tokenAtivo) {
      setErrorMsg("ACESSO NEGADO // TOKEN AUSENTE. Gere uma chave em [06] AUTH_KEYPAD.");
      return;
    }

    setErrorMsg("");
    setIsAborting(true);
    
    // Bipes rápidos e agressivos de aviso
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playBeep = (freq: number, duration: number, delay: number) => {
        setTimeout(() => {
          if (audioCtx.state === "closed") return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + duration);
        }, delay);
      };
      playBeep(880, 0.1, 0);
      playBeep(880, 0.1, 150);
      playBeep(980, 0.3, 300);
    } catch (e) {}

    // Executa a limpeza pesada nas tabelas do Postgres
    try {
      await fetch("/api/nuke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Isy-Token": tokenAtivo
        }
      });
    } catch (e) {
      console.error(e);
    }

    // Timer regressivo
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        onNukeComplete(); // 💥 Aciona o colapso imediatamente no pai
      }
    }, 1000);
  };

  return (
    <div className={`w-full max-w-3xl bg-black border transition-all duration-300 mx-auto ${
      isAborting 
        ? "border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)] animate-[pulse_0.5s_infinite_alternate]" 
        : "border-red-900/40 shadow-[0_0_30px_rgba(220,38,38,0.05)]"
    } p-6 md:p-8 font-mono text-left relative overflow-hidden rounded-xl`}>
      
      <div className="h-3 w-full bg-[linear-gradient(45deg,#eab308_25%,#000_25%,#000_50%,#eab308_50%,#eab308_75%,#000_75%,#000)] bg-[size:20px_20px] border-b border-zinc-900 -mt-6 md:-mt-8 mb-6 rounded-t-lg"></div>

      <div className="border-b border-zinc-900 pb-4 mb-6">
        <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1 ${
          isAborting ? "text-white bg-red-600 px-1.5 py-0.5 rounded animate-pulse" : "text-red-500"
        }`}>
          <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
          [EMERGENCY_PROT_99] // {glitchText}
        </div>
        <h2 className="text-xl font-black text-red-500 tracking-tight uppercase">
          KERNEL PANIC DISPATCHER
        </h2>
      </div>

      <div className="bg-red-950/10 border border-red-900/20 p-4 rounded-xl text-xs text-red-400/90 leading-relaxed space-y-2 mb-8 font-sans">
        <p className="font-mono text-[11px] font-bold text-red-500">⚠️ DIRETRIZ CRÍTICA DE AUTODESTRUIÇÃO:</p>
        <p>
          O acionamento deste atuador físico despacha um dump de falha de segmentação para a auditoria local, notifica o canal master do Discord com prioridade de colapso de hardware e purga tokens de acesso de maneira definitiva.
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-10 bg-zinc-950/40 border border-zinc-900 rounded-2xl relative overflow-hidden min-h-[300px]">
        {isAborting && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] animate-ping duration-1000"></div>
        )}

        {!isAborting ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 w-full">
            {errorMsg && (
              <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-950/40 border border-red-900 px-4 py-2 rounded shadow-[0_0_15px_rgba(220,38,38,0.2)] animate-pulse">
                {errorMsg}
              </div>
            )}
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-full animate-[pulse_2s_infinite]">
              <button
                onClick={handlePanicTrigger}
                className="w-44 h-44 rounded-full bg-gradient-to-b from-red-600 to-red-800 border-4 border-zinc-950 hover:from-red-500 hover:to-red-700 active:scale-90 duration-150 text-white font-black text-sm tracking-widest shadow-[0_0_50px_rgba(220,38,38,0.5)] uppercase flex flex-col items-center justify-center group cursor-pointer"
              >
                <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-200">☣</span>
                <span className="font-extrabold text-base tracking-widest">PANIC</span>
                <span className="text-[9px] text-red-200/50 tracking-widest font-normal mt-0.5">FORCE_WIPE</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest animate-pulse max-w-xs leading-normal">
              AWAITING AUTHENTICATED COMMAND LEVEL 0
            </p>
          </div>
        ) : (
          <div className="text-center space-y-6 py-6 relative z-10">
            <p className="text-5xl font-black text-red-500 tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-[bounce_0.5s_infinite_alternate]">
              PURGING IN: {countdown}s
            </p>
            <div className="text-left bg-black border border-red-900/40 p-4 w-80 font-mono text-[10px] text-red-400 space-y-1.5 shadow-inner">
              <p className="text-zinc-600 font-bold border-b border-zinc-900 pb-1 mb-1">// COLD CORE PROTOCOL</p>
              <p>&gt; COLLECTING POSTGRES MEMORY... <span className="text-white font-bold">OK</span></p>
              <p>&gt; FORCING FAIL_SEGFAULT LOG... <span className="text-red-500 font-bold">DUMPED</span></p>
              <p>&gt; ALERTA WEBHOOK ENVIADO... <span className="text-emerald-400 font-bold">DISCORD_OK</span></p>
              <p className="animate-pulse text-white font-bold">&gt; DECOUPLING SESSION COOKIES... CRIT_0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}