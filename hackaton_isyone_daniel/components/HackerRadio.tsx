"use client";

import { useState, useRef } from 'react';

export function HackerRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 📻 SUA URL MONSTRA AQUI
  // Sugestão se não tiver uma de streaming direto à mão agora:
  // Rádio Cyberpunk/Industrial (Slay Radio / Nightride FM / Cybercity)
  const RADIO_URL = "https://streaming.brol.tech/rtfmlounge"; 

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Stream error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full backdrop-blur-sm">
      {/* Elemento de áudio nativo escondido */}
      <audio ref={audioRef} src={RADIO_URL} preload="none" />

      {/* Indicador de Frequência / Onda */}
      <div className="flex items-center gap-1 h-3 w-4">
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_100ms] h-3' : 'h-1'}`}></span>
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_300ms] h-2.5' : 'h-1'}`}></span>
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_200ms] h-3.5' : 'h-1'}`}></span>
      </div>

      {/* Informações da Rádio */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Ops Audio</span>
        <span className="text-xs font-mono font-medium text-emerald-400 -mt-0.5">
          {isPlaying ? "CYBER_STREAM_ON" : "AUDIO_MUTED"}
        </span>
      </div>

      {/* Botão de Controle */}
      <button
        onClick={togglePlay}
        className={`ml-1 p-1 rounded-full border transition-all duration-200 focus:outline-none ${
          isPlaying 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
        }`}
        title={isPlaying ? "Mute Matrix" : "Connect to Frequency"}
      >
        {isPlaying ? (
          // Ícone de Pause
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          // Ícone de Play
          <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
    </div>
  );
}