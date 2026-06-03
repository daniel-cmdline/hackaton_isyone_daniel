// src/components/DocsTab.tsx
"use client";

export function DocsTab() {
  return (
    <div className="space-y-6 font-mono selection:bg-zinc-500/30">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-zinc-500 pl-4 py-1 mb-8">
        <div>
          <div className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase mb-1">
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
        <DocSection title="Infraestrutura e Docker" icon="🐳">
          A infraestrutura do Isyone sobe de forma orquestrada via Docker. O
          banco de dados <strong>PostgreSQL</strong> é inicializado e injetamos
          automaticamente um script <code>init.sql</code> que cria todas as
          tabelas (sessões, logs, scripts e tokens) no primeiro boot.
          <br />
          <br />
          Já a engine principal roda num container <strong>
            Node Alpine
          </strong>{" "}
          super leve, que executa o Next.js na porta <code>3000</code>. Essa
          arquitetura garante isolamento e resiliência na hora de executar os
          scripts no ambiente do SO.
        </DocSection>

        <DocSection title="Autenticação e Segurança" icon="🔐">
          O login é feito via Google OAuth2 (NextAuth). O e-mail do usuário
          logado se torna a "chave mestra" no banco de dados. Tudo o que o
          operador fizer no sistema (como injetar scripts ou gerar tokens)
          ficará carimbado com sua identidade de forma inforjável, garantindo um
          ambiente à prova de fraudes.
        </DocSection>

        <DocSection title="Isy Tokens (/api/tokens)" icon="🔑">
          Gerencia as credenciais de acesso da plataforma (GET, POST, DELETE).
          Os tokens criptografados em hash SHA-256 (que começam com{" "}
          <code>isy_live_...</code>) não nascem sozinhos: o usuário precisa
          gerá-los ativamente.
          <br />
          <br />A API cruza a sessão atual (autenticada via NextAuth) com o
          banco de dados para garantir que apenas o dono manipule e enxergue
          suas próprias chaves.
        </DocSection>

        <DocSection title="Listagem de Scripts (/api/list_scripts)" icon="📂">
          Cruza o mundo físico com o banco de dados. A rota lê os arquivos
          físicos <code>.sh</code> da pasta <code>/scripts</code> dentro do
          container Alpine e faz o <i>match</i> com seus metadados (descrição
          amigável, autoria) vindos da tabela <code>isy_scripts</code>. O
          resultado é um array consolidado entregue ao Frontend para gerar os
          Cards de execução.
        </DocSection>

        <DocSection title="Execução de Payloads (/api/execute)" icon="⚡">
          O coração do sistema. O frontend envia o nome do script a ser rodado e
          o token no Header. O backend atesta a validade da chave e usa o módulo
          nativo do Node (<code>exec</code>) para rodar o script no SO do
          container Alpine.
          <br />
          <br />A mágica da auditoria acontece exatamente aqui:{" "}
          <strong>
            essa própria rota já se encarrega de registrar o comando, o autor e
            a saída final na tabela de logs da base de dados
          </strong>
          , antes de devolver o resultado para ser impresso no Terminal da
          interface.
        </DocSection>

        <DocSection title="Criação de Scripts (/api/create_script)" icon="🛠️">
          Injeta novos payloads no sistema. O backend recebe o código Bash
          digitado na tela, salva o arquivo físico <code>.sh</code> no servidor
          concedendo permissão nativa de execução (<code>chmod +x</code>) e
          registra os metadados no banco, garantindo a rastreabilidade de quem o
          criou.
        </DocSection>

        <DocSection title="Auditoria de Logs (/api/logs)" icon="🛡️">
          Como os logs de auditoria já são salvos automaticamente no momento em
          que um script roda (via <code>/api/execute</code>), esta rota possui
          apenas a responsabilidade de leitura. Ela executa um{" "}
          <code>SELECT</code> ordenado por data trazendo a verdade absoluta do
          banco. O Frontend não precisa fazer <i>polling</i> constante; os dados
          são apenas requisitados de forma limpa.
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
    <div className="p-6 bg-zinc-950/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-xl flex flex-col group hover:border-zinc-500/40 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl shadow-inner group-hover:border-zinc-500/50 group-hover:bg-zinc-500/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-zinc-100 font-mono tracking-tight group-hover:text-zinc-300 transition-colors">
          {title}
        </h3>
      </div>
      <div className="text-xs text-zinc-400 font-sans leading-relaxed pl-14">
        {children}
      </div>
    </div>
  );
}
