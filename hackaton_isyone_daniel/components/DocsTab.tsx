// src/components/DocsTab.tsx
"use client";

export function DocsTab() {
  return (
    <div className="space-y-6 font-mono selection:bg-fuchsia-500/30">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-fuchsia-500 pl-4 py-1 mb-8">
        <div>
          <div className="text-[10px] text-fuchsia-400 font-bold tracking-widest uppercase mb-1">
            [ MODULE // SYSTEM_DOCUMENTATION ]
          </div>
          <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
            Documentação da Arquitetura
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed font-sans">
            Referência técnica da engenharia do sistema, fluxos de autenticação,
            criptografia e pipelines de automação da engine Isyone.
          </p>
        </div>
      </div>

      {/* CARDS DE DOCUMENTAÇÃO */}
      <div className="grid grid-cols-1 gap-6 pb-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <DocSection title="Autenticação via NextAuth Google Provider" icon="🔐">
          Uma arquitetura de verificação de identidade usando NextAuth com o
          Google Provider via protocolo OAuth2. Foi criado uma rota dinâmica
          "coringa" no Next.js que intercepta o fluxo de autenticação. Quando o
          usuário se autentica com sucesso no Google, a configuração captura o
          e-mail dele. Esse e-mail se torna a nossa chave de auditoria: toda vez
          que esse usuário criar um script ou gerar um Isy Token, o nosso
          backend usa essa sessão segura para carimbar o e-mail dele no
          Postgres, gerando um histórico de logs à prova de fraudes.
        </DocSection>

        <DocSection title="Isy Tokens (/api/tokens)" icon="🔑">
          Os IsyTokens são gerados na rota{" "}
          <code className="text-fuchsia-400">api/tokens</code> usando verbo HTTP
          GET e POST.
          <br />
          <br />A função <code>getServerSession</code> é importada diretamente
          do núcleo do NextAuth e valida os cookies da requisição no servidor,
          usando a chave <code>NEXTAUTH_SECRET</code> para descriptografar. Se
          logado, buscamos os tokens desse usuário na DB.
          <br />
          <br />
          Se o usuário não tiver tokens, geramos o primeiro automaticamente com
          um algoritmo <strong>SHA-256</strong> seguro e inserimos na database
          junto ao seu e-mail.
        </DocSection>

        <DocSection title="Listagem de Scripts (/api/list_scripts)" icon="📂">
          Após validarmos o <code>X-Isy-Token</code> enviado via frontend,
          buscamos os metadados na DB (nome, descrição e autor da tabela{" "}
          <code>isy_scripts</code>). O backend então lê a pasta{" "}
          <code>scripts/</code> via <code>fs.readdirSync</code> e cruza os
          arquivos físicos com os dados da DB. Se houver um arquivo solto não
          mapeado, ele ganha uma descrição genérica para a interface não
          quebrar.
        </DocSection>

        <DocSection title="Execução de Scripts (/api/execute)" icon="⚡">
          Chamada via POST contendo o token no header. Verificamos a validade da
          chave na DB antes da execução.
          <br />
          <br />O script (ex:{" "}
          <code className="text-fuchsia-400">limpar.sh</code>) é recebido pelo
          body, sanitizado contra Path Traversal, e executado assincronamente
          pelo método <code>exec</code> nativo do Node. O <code>stdout</code> é
          capturado, logado no banco de dados com <i>status</i>, e retornado
          integralmente para ser exibido em tempo real no Live Terminal da
          interface.
        </DocSection>

        <DocSection title="Criação de Scripts (/api/create_script)" icon="🛠️">
          A API recebe o nome, descrição e conteúdo via POST. Primeiramente,
          atestamos quem é o criador usando o Token da sessão. Checamos se o
          arquivo já não pertence a outro usuário (evitando sobrescrita
          indevida). O payload é salvo em disco usando permissões Linux{" "}
          <code>chmod +x (0o755)</code> via <code>fs.writeFileSync</code>. Por
          fim, os metadados são inseridos na DB.
        </DocSection>

        <DocSection title="Logs e Auditoria (/api/logs)" icon="🛡️">
          Após o check de segurança pelo Header do Isy-Token, efetuamos um{" "}
          <code>SELECT</code> simples ordenado por data na tabela{" "}
          <code>script_logs</code>. Os dados alimentam um mecanismo de "polling"
          reativo no Frontend, garantindo que o Histórico de Auditoria esteja
          sempre atualizado em tempo real.
        </DocSection>
      </div>
    </div>
  );
}

// Sub-componente de UI para os blocos da doc
function DocSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-zinc-950/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-xl flex flex-col group hover:border-fuchsia-500/40 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl shadow-inner group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-zinc-100 font-mono tracking-tight group-hover:text-fuchsia-400 transition-colors">
          {title}
        </h3>
      </div>
      <div className="text-xs text-zinc-400 font-sans leading-relaxed pl-14">
        {children}
      </div>
    </div>
  );
}
