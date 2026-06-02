// src/components/Sidebar.tsx
"use client";

import { signOut } from "next-auth/react";

interface SidebarProps {
  activeTab: "home" | "scripts" | "tokens" | "logs" | "create_script";
  setActiveTab: (
    tab: "home" | "scripts" | "tokens" | "logs" | "create_script",
  ) => void;
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between p-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h1 className="font-bold text-indigo-400 font-mono text-lg leading-none">
              ISYONE
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
              Automation Hub
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">
            Gerenciamento
          </p>

          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "home"
                ? "bg-indigo-600 text-white shadow-md font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span>👁️</span> Visão Geral
          </button>

          <button
            onClick={() => setActiveTab("scripts")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "scripts"
                ? "bg-indigo-600 text-white shadow-md font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span>📜</span> Listar Scripts
          </button>

          <button
            onClick={() => setActiveTab("create_script")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "create_script"
                ? "bg-indigo-600 text-white shadow-md font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span>📝</span> Criar Script
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "logs"
                ? "bg-indigo-600 text-white shadow-md font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span>📊</span> Histórico de Auditoria
          </button>

          <button
            onClick={() => setActiveTab("tokens")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "tokens"
                ? "bg-indigo-600 text-white shadow-md font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span>🔑</span> Chaves de API (Isy Tokens)
          </button>
        </nav>
      </div>

      <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center font-bold text-indigo-400 text-xs uppercase">
            {user.name?.charAt(0) || "O"}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-zinc-200 truncate">
              {user.name || "Operador"}
            </p>
            <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium rounded transition-all text-zinc-400 hover:text-zinc-200"
        >
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
}
