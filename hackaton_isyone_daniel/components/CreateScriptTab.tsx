// src/components/CreateScriptTab.tsx
"use client";

import { useState } from "react";

interface CreateScriptTabProps {
  tokenAtivo: string;
}

export function CreateScriptTab({ tokenAtivo }: CreateScriptTabProps) {
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(
    "#!/bin/bash\n\n# Escreva seu script aqui...\n",
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!tokenAtivo) {
      setMessage({
        type: "error",
        text: "Nenhum token ativo disponível. Verifique suas credenciais.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/create_script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Isy-Token": tokenAtivo,
        },
        body: JSON.stringify({ filename, description, content }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setFilename("");
        setDescription("");
        setContent("#!/bin/bash\n\n# Escreva seu script aqui...\n");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Falha ao injetar o script no host.",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: "Erro crítico de conexão na rota do pipeline.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-mono selection:bg-orange-500/30">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="border-l-2 border-orange-500 pl-4 py-1">
        <div className="text-[10px] text-orange-400 font-bold tracking-widest uppercase mb-1">
          [ MODULE // SCRIPT_ENGINE ]
        </div>
        <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
          Injetor de Automações Bash
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Gere novos scripts executáveis diretamente no volume da instância. O
          ecossistema Isyone aplicará a flag de provisionamento{" "}
          <span className="text-orange-400 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">
            chmod +x
          </span>{" "}
          em nível de kernel automaticamente.
        </p>
      </div>

      {/* FORMULÁRIO OPERACIONAL */}
      <form
        onSubmit={handleCreate}
        className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.7)] space-y-5 relative overflow-hidden group"
      >
        {/* Detalhe estético de background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* MENSAGENS DE STATUS ESTILO OUTPUT DE TERMINAL */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-mono border backdrop-blur-sm transition-all duration-200 ${
              message.type === "success"
                ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                : "bg-rose-950/30 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.05)]"
            }`}
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider mb-1 text-[10px]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${message.type === "success" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
              />
              {message.type === "success"
                ? "STDOUT // SUCCESS"
                : "STDERR // EXECUTION_FAILED"}
            </div>
            <p className="text-zinc-300 font-sans mt-1 pl-3.5 border-l border-zinc-800">
              {message.text}
            </p>
          </div>
        )}

        {/* ROW GRID: NOME DO ARQUIVO E DESCRIÇÃO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CAMPO: FILENAME */}
          <div className="space-y-2 md:col-span-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <span>🗄️</span> Nome do Arquivo
            </label>
            <div className="flex relative items-center rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-orange-500/80 transition-colors shadow-inner group/input">
              <span className="pl-3.5 pr-1 text-zinc-600 text-xs select-none group-focus-within/input:text-orange-500/60 transition-colors">
                $ bin/
              </span>
              <input
                type="text"
                required
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="limpar_cache"
                className="w-full bg-transparent px-1 py-3 text-xs text-zinc-200 focus:outline-none placeholder-zinc-700 font-mono tracking-wide"
              />
              <span className="pr-3.5 pl-1 text-zinc-500 text-[10px] font-bold select-none uppercase bg-zinc-950 border border-zinc-800 rounded-md py-0.5 mx-2">
                .sh
              </span>
            </div>
          </div>

          {/* CAMPO: DESCRIÇÃO */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <span>📝</span> Metadata / Descrição do Processo
            </label>
            <div className="flex relative items-center rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-orange-500/80 transition-colors shadow-inner group/input">
              <span className="pl-3.5 pr-1 text-zinc-600 text-xs select-none">
                #
              </span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Limpa os volumes temporários de logs no host local..."
                className="w-full bg-transparent px-2 py-3 text-xs text-zinc-200 focus:outline-none placeholder-zinc-700 font-mono"
              />
            </div>
          </div>
        </div>

        {/* CAMPO: EDITOR TEXTAREA (SHELL EDITOR) */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <span>💻</span> Source Code Payload
            </label>
            <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 select-none">
              Syntax: Bourne-Again Shell (bash)
            </span>
          </div>

          <div className="relative rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden focus-within:border-orange-500/80 transition-colors shadow-inner">
            {/* Topbar interna do Editor (Estilo Vim/Nano) */}
            <div className="bg-zinc-950/80 px-4 py-2 border-b border-zinc-800/60 flex justify-between text-[10px] text-zinc-500 select-none">
              <div>[ Buffer Mode ] - Encoding: UTF-8</div>
              <div className="animate-pulse text-orange-400/80">
                &lt; Ingest Mode &gt;
              </div>
            </div>

            {/* Area de Código com Linhas Laterais */}
            <div className="flex relative min-h-[260px]">
              {/* Números falsos de IDE */}
              <div className="bg-zinc-950/40 text-right pr-2 pl-3 py-3 select-none text-[10px] text-zinc-700 font-mono border-r border-zinc-800/40 flex flex-col leading-[1.625rem] w-10">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>

              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-transparent px-4 py-2.5 text-xs text-emerald-400/90 font-mono focus:outline-none resize-y leading-relaxed tracking-normal filter drop-shadow-[0_0_1px_rgba(52,211,153,0.1)] placeholder-zinc-700"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* FOOTER DO FORMULÁRIO COM O GATILHO DE PIPELINE */}
        <div className="pt-2 flex justify-between items-center border-t border-zinc-900">
          <div className="text-[10px] text-zinc-600 flex items-center gap-2 select-none">
            <span
              className={`w-1.5 h-1.5 rounded-full ${tokenAtivo ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
            />
            {tokenAtivo
              ? "Pipeline ativo & autenticado"
              : "Aguardando Token Válido"}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-800 border border-orange-400/30 text-zinc-100 font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.2)] active:scale-[0.98] transition-all duration-150 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
                Gravando...
              </>
            ) : (
              <>
                <span>🚀</span> Injetar Script no Host
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
