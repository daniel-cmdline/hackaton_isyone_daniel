# Isyone Engine

## 🚀 Como Inicializar a Aplicação

### 1. Configurando as Variáveis de Ambiente

**Aviso de Segurança:** Por motivos de segurança, os segredos de produção, como as credenciais reais do Google Cloud (OAuth2), não foram enviados para o repositório.

Para configurar o seu ambiente, você precisa criar o seu próprio arquivo `.env` baseado no arquivo de exemplo que deixamos. Para isso, rode o seguinte comando na raiz do projeto:

```bash
cp .env.example .env
```

Em seguida, abra o arquivo `.env` e preencha com as suas próprias credenciais o seu `GOOGLE_CLIENT_ID` e o `GOOGLE_CLIENT_SECRET` para que o login do sistema funcione corretamente.

**Passo a passo para obter as credenciais do Google:**

1. Acesse o Google Cloud Console.
2. Crie um novo projeto (ou selecione um existente).
3. Vá em **APIs e Serviços** > **Tela de consentimento OAuth** e configure-a (pode selecionar "Externo" para testar, preencha os nomes obrigatórios).
4. Vá em **Credenciais** > **Criar Credenciais** > **ID do cliente OAuth**.
5. Selecione o tipo de aplicativo como **Aplicativo da Web**.
6. **⚠️ Configuração Crítica de URLs (NextAuth):**
   - **URIs de redirecionamento autorizados:** Adicione `http://localhost:3000/api/auth/callback/google` _(Se essa URL não estiver exata, o login retornará erro de mismatch!)_
7. Clique em Criar. Copie o **ID do cliente** e a **Chave secreta do cliente** para o seu arquivo `.env`.

### 2. Subindo o Banco de Dados (Docker)

Com as variaveis prontas no seu .env, vamos subir uma imagem limpa do banco de dados PostgreSQL para gerenciar as sessões, tokens e logs. Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina, e então execute:

```bash
docker-compose up -d
```

Isso fará o download da imagem do Postgres e subirá um container em segundo plano usando as configurações do seu `.env`.

### 3. Com o Docker rodando

Acesse `http://localhost:3000` no seu navegador e você estará pronto para usar o Cockpit!

---

### 4. Resetando o Projeto (Limpeza de Dados)

Caso precise resetar o banco de dados e apagar o volume persistente do Docker, acesse o diretório raiz (root) do projeto e siga os passos abaixo:

1. Derrube os containers que estiverem ativos:

```bash
docker-compose down
```

2. Remova o diretório de dados do PostgreSQL para evitar conflitos no volume espelhado:

```bash
sudo rm -rf .pgdata
```

3. Suba os containers novamente com uma base de dados limpa:

```bash
docker-compose up -d
```