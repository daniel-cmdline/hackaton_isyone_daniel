// src/app/page.tsx
'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  // Função que clica no botão da tela e dispara a API segura que criamos por trás
  const dispararScript = async () => {
    setLoading(true);
    setOutput("Executando script no container...");
    
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 💡 Lembra do token de máquina? Injetamos ele aqui no header para passar na nossa própria API!
          "X-Isy-Token": "isy_dev_token_secret_123" 
        },
        body: JSON.stringify({
          scriptName: "teste.sh",
          args: ["--interface-web", session?.user?.name || "Admin"]
        })
      });

      const data = await res.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(`Erro: ${data.error}`);
      }
    } catch (err: any) {
      setOutput(`Erro de conexão: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center font-mono">Carregando sessão...</div>;
  }

  // TELA 1: Se o cara NÃO está logado
  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 font-sans">
        <h1 className="text-3xl font-bold mb-2 text-indigo-400">Isyone Automation Panel</h1>
        <p className="text-zinc-400 mb-6">Área restrita. Autentique-se para gerenciar o S.O.</p>
        <button 
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg shadow-lg transition-all"
        >
          Entrar com o Google
        </button>
      </div>
    );
  }

  // TELA 2: Painel Principal se o usuário ESTÁ logado
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-8 font-sans">
      <header className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-indigo-400">Dashboard de Automação</h1>
          <p className="text-sm text-zinc-400">Conectado como: <span className="text-zinc-200 font-semibold">{session.user?.email}</span></p>
        </div>
        <button 
          onClick={() => signOut()}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded transition-all"
        >
          Sair
        </button>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Controle do Script */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-zinc-200">Scripts Disponíveis</h2>
          <div className="space-y-3">
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-emerald-400">teste.sh</p>
                <p className="text-xs text-zinc-500">Testa execução no S.O. e printa argumentos.</p>
              </div>
              <button
                onClick={dispararScript}
                disabled={loading}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-800 font-semibold text-sm rounded transition-all"
              >
                {loading ? "Rodando..." : "Executar Comando"}
              </button>
            </div>
          </div>
        </div>

        {/* Terminal/Output de Logs */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 md:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-zinc-200">Console Output</h2>
          <div className="flex-1 bg-zinc-950 p-4 rounded-lg border border-zinc-800 font-mono text-xs overflow-x-auto whitespace-pre-wrap min-h-[250px] text-zinc-300">
            {output || "Nenhum comando executado ainda nesta sessão. Clique em 'Executar' ao lado."}
          </div>
        </div>
      </main>
    </div>
  );
}