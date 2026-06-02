// src/app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/SideBar";
import { ScriptsTab } from "@/components/ScriptsTab";
import { TokensTab } from "@/components/TokensTab";
import { LogsTab } from "@/components/LogsTab";
import { CreateScriptTab } from "@/components/CreateScriptTab";
import { FrontPage } from "@/components/FrontPage";
import { WelcomeCard } from "@/components/Home";
import { DocsTab } from "@/components/DocsTab";
import { WebhookTab } from "@/components/WebhookTab";
import { PanicTab } from "@/components/PanicTab";
import { AboutTab } from "@/components/AboutTab";
import { carregarTokensDoBanco as fetchTokens } from "./functions/carregarTokensDoBanco";
import { carregarLogs as fetchLogs } from "./functions/carregarLogs";
import { dispararScript as execScript } from "./functions/dispararScript";
import { gerarNovoIsyToken as createToken } from "./functions/gerarNovoIsyToken";
import { deletarToken as removeToken } from "./functions/deletarToken";

export default function Home() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "scripts"
    | "tokens"
    | "logs"
    | "create_script"
    | "docs"
    | "webhook"
    | "panic"
    | "about"
  >("home");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenAtivo, setTokenAtivo] = useState("");
  const [novoTokenGerado, setNovoTokenGerado] = useState("");
  const [sistemaNukado, setSistemaNukado] = useState(false);

  // FUNÇÕES WRAPPERS LOCAIS QUE ALIMENTAM AS FUNÇÕES EXTERNAS
  const carregarTokensDoBanco = async () => {
    await fetchTokens(setTokens, setTokenAtivo);
  };

  const carregarLogs = async () => {
    await fetchLogs(tokenAtivo, sistemaNukado, setLogs);
  };

  const dispararScript = async (scriptName: string) => {
    await execScript(
      scriptName,
      tokenAtivo,
      session?.user?.name || "Admin",
      setLoading,
      setOutput,
      carregarLogs,
    );
  };

  const gerarNovoIsyToken = async () => {
    await createToken(tokens.length, setNovoTokenGerado, carregarTokensDoBanco);
  };

  const deletarToken = async (tokenString: string) => {
    await removeToken(tokenString, carregarTokensDoBanco);
  };

  // 1. Ciclo de inicialização dos Tokens (Garante que roda assim que o usuário loga)
  useEffect(() => {
    if (session && !sistemaNukado) {
      carregarTokensDoBanco();
    }
  }, [session, sistemaNukado]);

  // Limpa o output do terminal sempre que a credencial (token ativo) mudar
  useEffect(() => {
    setOutput("");
  }, [tokenAtivo]);

  // 2. Polling de Logs Ajustado (Monitorea o tokenAtivo e a session de forma estável)
  useEffect(() => {
    // Só inicia o relógio se tiver sessão válida, token carregado e SE A ABA ATIVA FOR A DE LOGS
    if (!session || !tokenAtivo || sistemaNukado || activeTab !== "logs")
      return;

    // Carrega a primeira leva de logs imediatamente
    carregarLogs();

    // Cria o intervalo de 5 segundos cravados
    const interval = setInterval(() => {
      carregarLogs();
    }, 5000);

    return () => clearInterval(interval);
  }, [tokenAtivo, sistemaNukado, activeTab, session]); // Mantemos apenas o token para blindar o loop, mas o validador interno de sessão protege o fetch
  // Callback de destruição disparado pelo timer da PanicTab
  const executarFimDoMundo = () => {
    setSistemaNukado(true);
  };

  // Executa o Reboot real limpando tudo e deslogando o Google SSO
  const reiniciarSessaoDoZero = () => {
    setSistemaNukado(false);
    setActiveTab("home");
    setTokenAtivo("");
    setTokens([]);
    setLogs([]);
    setOutput("");
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 font-mono text-indigo-400 animate-pulse">
        <span>Carregando cockpit...</span>
        <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <FrontPage />;
  }

  // 💀 INTERVENÇÃO DE LAYOUT GLOBAL: Se foi nukado, desmonta tudo e mostra a tela cinzenta de colapso
  if (sistemaNukado) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 font-mono p-6 flex flex-col items-center justify-center select-none text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none animate-[pulse_0.1s_infinite]"></div>

        <div className="w-full max-w-2xl border-2 border-red-600 bg-black p-6 space-y-6 shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-lg">
          <div className="bg-red-600 text-black font-black px-2 py-1 text-center text-sm uppercase tracking-widest">
            !!! FATAL EXCEPTION DETECTED !!!
          </div>

          <div className="space-y-2 text-xs text-red-400">
            <p className="font-bold text-white text-sm">
              &gt; KERNEL_PANIC: ORG.ISYONE.CORE.PURGE_INTERRUPT
            </p>
            <p>• COLD REBOOT REQUESTED ON OPERATOR TERMINAL...</p>
            <p>• DUMPING POSTGRES RELATIONS... [SUCCESS: 100% WIPED]</p>
            <p>• REVOKING HARDWARE TOKENS... [ALL KEYS INVALIDATED]</p>
            <p>• DISCORD AUDIT BARRIER... [ALERTA DISPARADO NO HUB]</p>
            <p>--------------------------------------------------------</p>
            <p className="text-zinc-600">STACK TRACE DESTRUTIVO EM REPOUSO:</p>
            <p className="text-zinc-500 break-all bg-zinc-950 p-2 border border-zinc-900">
              0x0000000B (SIGSEGV) // CORE_DUMPED_AT_0x88FF9A //
              ATUADOR_FISICO_DISPARADO // MEM_FLUSH_COMPLETE //
              INSTANCE_SANUTIZED_BY_ROOT
            </p>
          </div>

          <div className="border-t border-zinc-900 pt-4 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-widest animate-pulse mb-4">
              Ponte criptográfica destruída. Sistema offline.
            </p>
            <button
              onClick={reiniciarSessaoDoZero}
              className="px-6 py-2.5 bg-transparent border border-red-500 hover:bg-red-600 hover:text-black font-bold text-xs uppercase tracking-widest duration-150 transition-all cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
            >
              [➔ INITIALIZE_REBOOT_NODE]
            </button>
          </div>
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

        {activeTab === "home" && <WelcomeCard />}
        {activeTab === "docs" && <DocsTab />}
        {activeTab === "scripts" && (
          <ScriptsTab
            loading={loading}
            output={output}
            dispararScript={dispararScript}
            tokenAtivo={tokenAtivo}
          />
        )}
        {activeTab === "create_script" && (
          <CreateScriptTab tokenAtivo={tokenAtivo} />
        )}
        {activeTab === "logs" && (
          <LogsTab logs={logs} tokenAtivo={tokenAtivo} />
        )}
        {activeTab === "tokens" && (
          <TokensTab
            tokens={tokens}
            novoTokenGerado={novoTokenGerado}
            gerarNovoIsyToken={gerarNovoIsyToken}
            deletarToken={deletarToken}
          />
        )}

        {/* 🚨 Aciona o callback que desmonta a árvore e corta o som */}
        {activeTab === "panic" && (
          <PanicTab
            tokenAtivo={tokenAtivo}
            onNukeComplete={executarFimDoMundo}
          />
        )}
        {activeTab === "webhook" && <WebhookTab />}
        {activeTab === "about" && <AboutTab />}
      </div>
    </div>
  );
}
