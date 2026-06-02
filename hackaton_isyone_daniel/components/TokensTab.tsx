// src/components/TokensTab.tsx
'use client'

interface TokensTabProps {
  tokens: any[];
  novoTokenGerado: string;
  gerarNovoIsyToken: () => void;
}

export function TokensTab({ tokens, novoTokenGerado, gerarNovoIsyToken }: TokensTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Gerenciador de X-Isy-Tokens</h2>
          <p className="text-xs text-zinc-400">Crie credenciais estáticas para permitir que máquinas externas acessem sua API com segurança.</p>
        </div>
        <button
          onClick={gerarNovoIsyToken}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs rounded-lg shadow transition-all flex items-center gap-2 hover:scale-105"
        >
          <span>➕</span> Gerar Novo Token
        </button>
      </div>

      {novoTokenGerado && (
        <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-xl font-mono text-xs text-indigo-300">
          <p className="font-bold text-zinc-100 mb-1">⚠️ Token gerado com sucesso! Copie-o agora:</p>
          <div className="bg-zinc-950 p-2.5 rounded border border-indigo-900 flex justify-between items-center text-zinc-200 select-all font-bold">
            <span>{novoTokenGerado}</span>
            <span className="text-[10px] bg-indigo-900 text-indigo-200 px-1.5 py-0.5 rounded uppercase font-sans">Pronto</span>
          </div>
        </div>
      )}

      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-sm">
        <h3 className="text-sm font-semibold mb-4 text-zinc-300 font-mono">Chaves Ativas Cadastradas</h3>
        <div className="space-y-3">
          {tokens.map((tk) => (
            <div key={tk.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-4">
                <div className="text-xl">🔑</div>
                <div>
                  <p className="font-bold text-zinc-200">{tk.name}</p>
                  <p className="text-zinc-500 font-semibold text-[11px]">
                    {tk.token.substring(0, 12)}...••••••••••••
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded text-[9px] font-bold uppercase mr-3">Ativo</span>
                <span className="text-zinc-500 text-[10px]">{new Date(tk.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}