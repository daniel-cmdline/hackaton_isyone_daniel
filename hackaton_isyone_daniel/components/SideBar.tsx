// src/components/Sidebar.tsx
"use client";

import { signOut } from "next-auth/react";

interface SidebarProps {
  activeTab: "home" | "scripts" | "tokens" | "logs" | "create_script" | "docs" | "webhook" | "panic" | "about";
  setActiveTab: (
    tab: "home" | "scripts" | "tokens" | "logs" | "create_script" | "docs" | "webhook" | "panic" | "about",
  ) => void;
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
  return (
    <aside className="w-64 bg-black border-r border-zinc-900 flex flex-col justify-between p-4 select-none font-mono min-h-screen">
      <div className="space-y-6">
        {/* Brand / Core Identity */}
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div>
            <h1 className="font-black text-emerald-400 text-base tracking-wider leading-none">
              ISYONE//OPS
            </h1>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold mt-1">
              H4cK4%Th0N_FMU.v0.39
            </p>
          </div>
        </div>

        {/* Navigation Matrix */}
        <nav className="space-y-1">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest px-2 mb-2">
            :: CORE_PRIVILEGES
          </p>

          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "home"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "home" ? "➔" : "▪"}</span> [01] SYS_OVERVIEW
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">SYS_OK</span>
          </button>

          <button
            onClick={() => setActiveTab("scripts")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "scripts"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "scripts" ? "➔" : "▪"}</span> [02] EXEC_MATRIX
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">SH_EXEC</span>
          </button>

          <button
            onClick={() => setActiveTab("create_script")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "create_script"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "create_script" ? "➔" : "▪"}</span> [03] COMPILE_NODE
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">WRITE</span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "logs"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "logs" ? "➔" : "▪"}</span> [04] KERNEL_AUDIT
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">STDOUT</span>
          </button>

          <button
            onClick={() => setActiveTab("webhook")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "webhook"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "webhook" ? "➔" : "▪"}</span> [05] WEBHOOK_TUNNEL
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">DISCORD</span>
          </button>

          <button
            onClick={() => setActiveTab("tokens")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "tokens"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "tokens" ? "➔" : "▪"}</span> [06] AUTH_KEYPAD
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">TOKENS</span>
          </button>

          <button
            onClick={() => setActiveTab("docs")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "docs"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "docs" ? "➔" : "▪"}</span> [07] BLACK_BOOK
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">MAN_8</span>
          </button>

          <button
            onClick={() => setActiveTab("panic")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "panic"
                ? "bg-red-950/20 border-red-500/40 text-red-400 font-bold shadow-[0_0_10px_rgba(239,68,68,0.15)] animate-pulse"
                : "border-transparent text-zinc-500 hover:text-red-400 hover:bg-red-950/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "panic" ? "☣" : "▪"}</span> [08] PANIC_TRIGGER
            </span>
            <span className="text-[9px] text-red-950 font-bold bg-red-500/10 border border-red-500/20 px-1 rounded">CRIT_0</span>
          </button>

          {/* 💻 MÁGICA CONCLUÍDA: ABA [09] COMPACTADA COM SUCESSO AQUI */}
          <button
            onClick={() => setActiveTab("about")}
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-mono transition-all border ${
              activeTab === "about"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px]">{activeTab === "about" ? "➔" : "▪"}</span> [09] SYS_ADM_ROOT
            </span>
            <span className="text-[9px] text-zinc-700 font-normal">ROOT_OP</span>
          </button>
        </nav>

        {/* Live Network Decoupling */}
        <div className="border border-zinc-900 bg-zinc-950 p-2.5 space-y-1.5">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-none">:: NET_METRIC</p>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-500">GATEWAY_TUNNEL:</span>
            <span className="text-emerald-500/80 font-bold">ACTIVE</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-500">LOCAL_PORT:</span>
            <span className="text-zinc-400">5432//3000</span>
          </div>
        </div>
      </div>

      {/* Operator Metadata Frame */}
      <div className="border-t border-zinc-900 pt-3 flex flex-col gap-2.5">
        <div className="bg-zinc-950 border border-zinc-900 p-2 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-emerald-400 text-xs">
            {user.name?.charAt(0) || "D"}
          </div>
          <div className="overflow-hidden leading-none">
            <p className="text-[11px] font-bold text-zinc-300 truncate">
              {user.name ? `OP_${user.name.toUpperCase().replace(/\s+/g, '_')}` : "OP_DANIEL"}
            </p>
            <p className="text-[9px] text-zinc-600 truncate mt-1 font-sans">{user.email || "daniel.caesar@admin.node"}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full py-1 border border-zinc-900 hover:border-red-900/50 bg-transparent hover:bg-red-950/10 text-[10px] text-zinc-500 hover:text-red-400 transition-all font-bold uppercase tracking-wider"
        >
          SIGNOUT_NODE
        </button>
      </div>
    </aside>
  );
}