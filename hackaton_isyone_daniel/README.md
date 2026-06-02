DOCUMENTAÇÃO

AUTENTICAÇÃO VIA NEXTAUTH GOOGLE PROVIDER

Uma arquitetura de verificação de identidade usando NextAuth com o Google Provider via protocolo OAuth2. Foi criado uma rota dinâmica "coringa" no Next.js que intercepta o fluxo de autenticação. Quando o usuário se autentica com sucesso no Google, a configuração captura o e-mail dele. Esse e-mail se torna a nossa chave de auditoria: toda vez que esse usuário criar um script ou gerar um Isy Token, o nosso backend usa essa sessão segura para carimbar o e-mail dele no Postgres, gerando um histórico de logs à prova de fraudes."

ISY TOKENS
os IsyTokens sao gerados na rota api/tokens usando verbo http GET. 

A função getServerSession é importada diretamente do núcleo do NextAuth (next-auth/next). Ela é responsável por interceptar a requisição HTTP no lado do servidor e validar os cookies de sessão que o navegador do usuário enviou.

O getServerSession consome o objeto authOptions (que contém a chave privada NEXTAUTH_SECRET). Ele utiliza essa chave para descriptografar o cookie da requisição. Se o cookie tiver sido forjado ou modificado por terceiros, a assinatura criptográfica quebra e a função retorna null.

Se passarmos dessa fase com sucesso, ai sim salvamos o email do usuario que esta na variavel session e buscamos os tokens desse usuario no Postgres. 

Caso retornemos um objeto rows de tamanho 0, significa que ele não tem tokens na database, então geramos uma pra ele com um algoritimo SHA seguro e inserimos na database junto ao seu nome, e email. 

A mesma rota /api/tokens, usando o verbo POST, é responsável pela criação de novos tokens para esse usuario caso ele queira criar novos tokens. Rodamos as mesmas verificações do NextAuth pela funcao getServerSession. Se autorizado, ele da baixa em mais uma entrada de token na database, acumulando tokens. 

LISTAGEM DE SCRIPTS 
Chamamos a rota /api/list_scripts, verificamos o X-Isy-Token Header -> algo interessante que ocorre aqui*. Pois nós puxamos o token do front end, por uma requisição na database, socamos o header X-Isy-Token pelo front na requisição e enviamos para o backend. 
Fazemos a verificação, se tudo estiver certo buscamos na db pelos metadados de todos arquivos, o nome, a descricao e a hora de criacao da tabela isy_scripts. Montamos um caminho até a pasta scripts e gravamos numa variavel, verifica-se se o diretório é acessivel e se sim, le-se todos os arquivos do mesmo e salva-os em um array de strings. 
Loopamos por esses arquivos e filtramos apenas por arquivos que terminam com .sh e finalmente mapeamos os files com o que pegamos da db. Se você tem o arquivo meu_script.sh na pasta, e ele tem uma descrição cadastrada lá na tabela isy_scripts, ele usa ela. Se alguém colocou um arquivo lá na pasta manualmente e ainda não cadastrou no banco, ele não quebra a interface e preenche com um texto padrão genérico. Mas realmente é uma operação bem não intuitiva e dificil de ler. Finalmente Esses scripts são retornados mapeados pro front como objetos dentro de uma lista com nome do arquivo e descricao do script.

EXECUÇÃO DE SCRIPTS 
chamamos a rota /api/execute, utilizando o verbo HTTP POST. Verificamos se existe um token enviado nos headers da requisição. *Mas existe algo interessante que ocorre aqui*. Pois nós puxamos o token do front end, por uma requisição na database, socamos o header X-Isy-Token pelo front na requisição e enviamos para o backend. Ou seja, nós chamamos a rota /api/tokens antes que a requisição de execução possa ser feita. É salvo uma lista de tokens como estado no front, e é usado apenas um token para requisições de execução. 
Então apos mais uma checagem na database se o token realmente existe, executamos o script. O script vem pelo body da requisicao como scriptName acompnhado de um objeto args. Eles são desestruturados no endpoint, verifica-se e o nome do scriipt é invalido, monta-se o caminho do script via process.cwd para a pasta scripts com o nome do script, formando a string scripts/${nomedoScript},
e depois de juntar possiveis argumentos desse script caso o script rode com alguma tag adicional, executa o script pelo caminho de forma asincrona, captura o stdout, grava o comando, status, output e operacao no banco de dados para visualização dos logs futuramente e finalmente retorna o output completo da saída do script para exibição no componente LiveTerminal do frontend.  

CRIAÇÃO DE SCRIPTS
Da mesma forma que as outras, a X-Isy-Token é a primeira guard clause que agt tem, caso passemos dela, agt faz mais uma verificacao no banco. Mas o importante aqui é que recebe o nome do arquivo, a descricao do arquivo e o content do arquivo via requisicao , fazemos uma serie de checks importantes que a essa hora da madrugada não vale a pena explicar, montamos o path do arquivo com o nome do arquivo e finalmente escrevemos o arquivo no devido diretorio com o devido conteudo. Finalmente inserimos uma entrada de metadados na tabela de scripts, para que possamos listar pelo outro endpoint. O retorno é apenas uma mensagem de sucesso nesse caso no corpo da resposta. 

LOGS DOS SCRIPTS
Log dos scripts performa o mesmo check pelo header da requisicao afim de saber se o x-isy-token esta sendo passado, e se tiver tudo ok agt seleciona id, comando, status, criacao, stdout_preview da tabela script logs ordenando por data de criação. Voltamos tudo na resposta para exibição no front. Esse layer é basicamente metadados que foram inseridos na execução do arquivo quando batemos na rota /api/execute. 



