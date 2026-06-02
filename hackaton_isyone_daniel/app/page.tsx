// src/app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/SideBar";
import { ScriptsTab } from "@/components/ScriptsTab";
import { TokensTab } from "@/components/TokensTab";

export default function Home() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"scripts" | "tokens">("scripts");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  // ⚡ Gerenciamento Dinâmico de Tokens de Banco
  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenAtivo, setTokenAtivo] = useState("");
  const [novoTokenGerado, setNovoTokenGerado] = useState("");

  // Busca chaves reais do banco cadastradas para o usuário
  const carregarTokensDoBanco = async () => {
    try {
      const res = await fetch("/api/tokens", { method: "GET" });

      if (!res.ok) {
        const txtErro = await res.text();
        console.error(
          `[ISY-DEBUG] Erro HTTP ${res.status} em /api/tokens:`,
          txtErro,
        );
        return;
      }

      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setTokens(data.data);
        setTokenAtivo(data.data[0].token);
        console.log(
          "[ISY-DEBUG] Token ativo configurado com sucesso:",
          data.data[0].token,
        );
      } else {
        console.warn(
          "[ISY-DEBUG] Resposta de tokens vazia ou malformada:",
          data,
        );
      }
    } catch (err) {
      console.error("[ISY-DEBUG] Falha de rede ao buscar /api/tokens:", err);
    }
  };

  const carregarLogs = async () => {
    if (!tokenAtivo) return;
    try {
      const res = await fetch("/api/logs", {
        method: "GET",
        headers: { "X-Isy-Token": tokenAtivo },
      });

      if (!res.ok) {
        const txtErro = await res.text();
        console.error(
          `[ISY-DEBUG] Erro HTTP ${res.status} em /api/logs:`,
          txtErro,
        );
        return;
      }

      const data = await res.json();
      if (data.success) setLogs(data.data);
    } catch (err) {
      console.error("[ISY-DEBUG] Falha de rede ao buscar /api/logs:", err);
    }
  };

  const dispararScript = async (scriptName: string) => {
    if (!tokenAtivo) {
      setOutput(
        "[ERRO] Nenhum Isy-Token ativo encontrado para autenticar a requisição.",
      );
      return;
    }
    setLoading(true);
    setOutput(`[S.O.] Enviando request com X-Isy-Token ativo...`);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Isy-Token": tokenAtivo,
        },
        body: JSON.stringify({
          scriptName,
          args: ["--interface-web", session?.user?.name || "Admin"],
        }),
      });

      if (!res.ok) {
        const txtErro = await res.text();
        setOutput(`[ERRO HTTP ${res.status}] Falha na rota do servidor.`);
        console.error(
          `[ISY-DEBUG] Erro HTTP ${res.status} em /api/execute:`,
          txtErro,
        );
        setLoading(false);
        return;
      }

      const data = await res.json();
      setOutput(data.success ? data.output : `[ERRO TERMINAL] ${data.error}`);
      carregarLogs();
    } catch (err: any) {
      setOutput(`[ERRO DE CONEXÃO] ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const gerarNovoIsyToken = async () => {
    try {
      const nomeToken = `Chave_Ops_${tokens.length + 1}`;
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nomeToken }),
      });

      if (!res.ok) {
        const txtErro = await res.text();
        console.error(
          `[ISY-DEBUG] Erro HTTP ${res.status} ao criar token:`,
          txtErro,
        );
        return;
      }

      const data = await res.json();
      if (data.success) {
        setNovoTokenGerado(data.data.token);
        await carregarTokensDoBanco();
      }
    } catch (err) {
      console.error("[ISY-DEBUG] Erro na requisição de geração de token:", err);
    }
  };

  // Ciclo único de inicialização quando o login acontece
  useEffect(() => {
    if (session) {
      carregarTokensDoBanco();
    }
  }, [session]);

  // Polling reativo e isolado apenas se houver sessão e token ativo configurados
  useEffect(() => {
    if (!session || !tokenAtivo) return;

    carregarLogs();
    const interval = setInterval(carregarLogs, 5000);
    return () => clearInterval(interval);
  }, [session, tokenAtivo]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-mono text-indigo-400 animate-pulse">
        Carregando cockpit...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 md:p-10 bg-zinc-900/60 border border-zinc-800 rounded-3xl shadow-2xl text-center backdrop-blur-sm">
          <span className="text-6xl mb-6 block drop-shadow-md">⚡</span>
          <h1 className="text-2xl font-bold mb-3 text-zinc-100 font-mono tracking-tight">
            Isyone Ops Central
          </h1>
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
            Autenticação segura via Single Sign-On é obrigatória para acessar as
            instâncias.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.25)] border border-indigo-500 hover:scale-[1.02] duration-200 transition-all"
          >
            Entrar com o Google SSO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
      <div className="w-full md:w-auto shrink-0 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl bg-zinc-900">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={session.user!}
        />
      </div>

      <div className="flex-1 w-full min-w-0">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
          >
            Sair
          </button>
        </div>

        {activeTab === "scripts" ? (
          <ScriptsTab
            loading={loading}
            output={output}
            logs={logs}
            dispararScript={dispararScript}
          />
        ) : (
          <TokensTab
            tokens={tokens}
            novoTokenGerado={novoTokenGerado}
            gerarNovoIsyToken={gerarNovoIsyToken}
          />
        )}
      </div>
    </div>
  );
}
