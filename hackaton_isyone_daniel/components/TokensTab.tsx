// src/components/TokensTab.tsx
"use client";

interface TokenStructure {
  id: string | number;
  name: string;
  token: string;
  created_at: string | Date;
}

interface TokensTabProps {
  tokens: TokenStructure[];
  novoTokenGerado: string;
  gerarNovoIsyToken: () => void;
  deletarToken: (tokenString: string) => void;
}

export function TokensTab({
  tokens,
  novoTokenGerado,
  gerarNovoIsyToken,
  deletarToken,
}: TokensTabProps) {
  return (
    <div className="space-y-6 font-mono selection:bg-amber-500/30">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-amber-500 pl-4 py-1">
        <div>
          <div className="text-[10px] text-amber-400 font-bold tracking-widest uppercase mb-1">
            [ MODULE // CRYPTO_VAULT_MANAGER ]
          </div>
          <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
            Gerenciador de X-Isy-Tokens
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed font-sans">
            Provisione credenciais estáticas simétricas para permitir que nós de
            microsserviços ou daemons externos assinem requisições na API com
            segurança de criptografia em repouso.
          </p>
        </div>

        <button
          onClick={gerarNovoIsyToken}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 border border-amber-400/40 text-zinc-100 font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 select-none shrink-0"
        >
          <span>🔑</span> Gerar Novo Token
        </button>
      </div>

      {/* MENSAGEM DE TOKEN RECÉM-GERADO (SECRET BUFFER ALERT) */}
      {novoTokenGerado && (
        <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.05)] backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[35px] opacity-[0.03] select-none font-bold p-2 text-amber-500">
            SECURE_KEY
          </div>

          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[10px] mb-2 select-none">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
            [ WARNING // VOLATILE_CREDENTIAL_INJECTED ]
          </div>
          <p className="text-zinc-300 font-sans text-xs mb-3 pl-3.5 border-l border-zinc-800">
            Chave simétrica compilada com sucesso. Armazene este hash em seu
            gerenciador de segredos local. Ele não será exibido novamente no
            painel.
          </p>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 flex justify-between items-center text-amber-400 select-all font-mono text-xs shadow-inner border-l-2 border-l-amber-500 font-bold group/token">
            <span className="break-all tracking-wider font-mono">
              {novoTokenGerado}
            </span>
            <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase font-mono tracking-widest font-bold select-none shrink-0 ml-4">
              READY
            </span>
          </div>
        </div>
      )}

      {/* PAINEL DE CHAVES ATIVAS CADAUSTRADAS */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative group">
        {/* Barra superior de identificação do Vault */}
        <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2.5 border-b border-zinc-800/60 flex items-center justify-between select-none text-[10px]">
          <div className="flex items-center gap-2 text-zinc-400 font-bold">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            HSM_BUFFER // REGISTERED_SYMMETRIC_KEYS
          </div>
          <div className="text-zinc-600 text-[9px] uppercase tracking-wider font-bold">
            Status: Encrypted
          </div>
        </div>

        {/* Lista de Tokens Cadastrados */}
        <div className="p-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {tokens.length === 0 ? (
            <div className="p-8 text-center text-zinc-600 text-xs select-none">
              &gt; Nenhuma credencial cadastrada neste nó de segurança. Vault
              vazio.
            </div>
          ) : (
            tokens.map((tk) => (
              <div
                key={tk.id}
                className="p-4 bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-900 hover:border-zinc-800 rounded-xl flex items-center justify-between gap-4 transition-all duration-150 group/item"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs text-zinc-500 group-hover/item:text-amber-400 group-hover/item:border-amber-500/30 transition-colors select-none">
                    SHA
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-200 text-xs tracking-tight truncate">
                      {tk.name}
                    </p>
                    <p className="text-zinc-600 font-mono text-[10px] mt-0.5 tracking-widest truncate">
                      <span className="text-zinc-500 font-bold">
                        {tk.token.substring(0, 12)}
                      </span>
                      <span>••••••••••••</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-4 select-none">
                  <span className="inline-block px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-md text-[9px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                    ACTIVE
                  </span>
                  <span className="text-zinc-600 text-[10px] tracking-tighter hidden sm:inline font-bold">
                    {new Date(tk.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    onClick={() => deletarToken(tk.token)}
                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/50 rounded-lg transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
                    title="Revogar credencial"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé técnico da tabela */}
        <div className="bg-zinc-900/20 px-4 py-2 border-t border-zinc-900 text-[10px] text-zinc-600 flex justify-between items-center select-none">
          <div>AES-GCM encryption node state: VALID</div>
          <div>FMU_VAULT_STATION // 2026</div>
        </div>
      </div>
    </div>
  );
}
