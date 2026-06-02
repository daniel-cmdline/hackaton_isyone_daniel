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
      setMessage({ type: "error", text: "Nenhum token ativo disponível." });
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
          text: data.error || "Falha ao criar o script.",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: "Erro de conexão ao tentar criar o script.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-100">Criar Novo Script</h2>
        <p className="text-xs text-zinc-400">
          Escreva e salve um novo arquivo Bash direto no sistema operacional.
          Ele receberá permissão de execução automaticamente.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-sm space-y-4"
      >
        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-medium border ${message.type === "success" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/50" : "bg-red-950/50 text-red-400 border-red-900/50"}`}
          >
            {message.type === "success" ? "✅ " : "❌ "} {message.text}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300">
            Nome do Arquivo (.sh)
          </label>
          <div className="flex">
            <input
              type="text"
              required
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="ex: limpar_cache"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300">
            Descrição do Script
          </label>
          <div className="flex">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex: Limpa os caches temporários do sistema..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-semibold text-zinc-300">
            Conteúdo do Script
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 font-mono transition-colors resize-y leading-relaxed"
            spellCheck={false}
          ></textarea>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2"
          >
            {loading ? "Salvando..." : "💾 Salvar Script"}
          </button>
        </div>
      </form>
    </div>
  );
}
