// src/components/HackerRadio.tsx
"use client";

import { useState, useRef, useEffect } from 'react';

// Declaração global para o TypeScript não chiar com a API do YouTube
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export function HackerRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const playerRef = useRef<any>(null);

  // 📻 EXTRAÇÃO DO ID DO VÍDEO DO YOUTUBE
  const VIDEO_ID = "UedTcufyrHc"; 

  useEffect(() => {
    // 1. Carrega o script da API do YouTube de forma assíncrona se já não existir
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      // Garantir que não duplique o player se o useEffect rodar duas vezes no StrictMode
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('invisible-youtube-player', {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: () => setIsApiReady(true),
        }
      });
    }

    return () => {
      // Evita vazamento de memória se o componente desmontar
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isApiReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full backdrop-blur-sm select-none font-mono">
      
      {/* 🔮 O TRUQUE CORRIGIDO: Tiramos o 'hidden' porque o YT precisa renderizar o nó, usamos opacidade e tamanho zero absoluto */}
      <div 
        id="invisible-youtube-player" 
        className="w-0 h-0 opacity-0 absolute pointer-events-none"
        style={{ width: 0, height: 0 }}
      ></div>

      {/* Indicador de Frequência / Onda (Barras invertidas removidas do fechamento) */}
      <div className="flex items-center gap-1 h-3 w-4">
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_100ms] h-3' : 'h-1'}`}></span>
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_300ms] h-2.5' : 'h-1'}`}></span>
        <span className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[bounce_1s_infinite_200ms] h-3.5' : 'h-1'}`}></span>
      </div>

      {/* Informações da Rádio */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase">SYNTH_WAVE Audio Tunnel</span>
        <span className="text-xs font-medium text-emerald-400 -mt-0.5">
          {!isApiReady ? "LOADING_API..." : isPlaying ? "STREAM_ON_LIVE" : "MATRIX_MUTED"}
        </span>
      </div>

      {/* Botão de Controle */}
      <button
        onClick={togglePlay}
        disabled={!isApiReady}
        className={`ml-1 p-1 rounded-full border transition-all duration-200 focus:outline-none disabled:opacity-30 ${
          isPlaying 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
        }`}
        title={isPlaying ? "Mute Stream" : "Hook into YouTube Stream"}
      >
        {isPlaying ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
    </div>
  );
}