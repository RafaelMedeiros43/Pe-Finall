CACA - Projeto Académico (Nome do Sistema)
Identificação do Grupo
Nome: Miguel Matos(2024111725),Rafael Medeiros(2024109280),Tomás Couto(2024111781)


##Tecnologias e Justificação
Front-end:  React.js – Escolhido pela sua arquitetura baseada em componentes, que facilita a escalabilidade e a reutilização de código.

Back-end: Node.js com Express – Escolhido pela performance, escalabilidade e excelente ecossistema de bibliotecas para desenvolvimento rápido de APIs RESTful.

Base de Dados: MySQL  – Optámos por uma base de dados relacional pela integridade dos dados e facilidade de estruturação das relações entre utilizadores e recursos do CACA.

Estrutura da Aplicação
A arquitetura baseia-se num modelo cliente-servidor:

Front-end: Desenvolvido em React, comunica com a API via chamadas HTTP (Axios/Fetch).

Back-end: Servidor Node.js que expõe endpoints protegidos por JWT.

Base de Dados: MySQL, persistindo os dados através do ORM Sequelize.

Funcionalidades Implementadas
Gestão de Utilizadores: Sistema completo de autenticação (Login/Registo) , utilizando bcryptjs para hashing de passwords e jsonwebtoken para controlo de sessões.

Perfil do Utilizador: Funcionalidade de leitura e atualização de dados de perfil, protegida por middleware de autenticação.

Integrações: Implementação de serviços externos (Google Maps e Gnews) para enriquecimento do dashboard .

##Como Correr a Aplicação
Back-end:
Navega para a pasta caca-FinalBackEnd/.

Instala dependências: npm install.

Configura o ficheiro .env com as tuas credenciais de base de dados.

Inicia o servidor: npm run dev.

Front-end:
Navega para a pasta do front-end.

Instala dependências: npm install.

Inicia a aplicação: npm start.

##Decisões de Design e Desafios
Desafio:O principal obstáculo técnico foi a comunicação entre o cliente (React.js) e o servidor (Node.js/Express).

Solução: 

Interceção de Requests: Implementação de um interceptor no Axios (no front-end) para injetar automaticamente o JWT Token no header Authorization de todas as chamadas para a API.

Tratamento de Erros: Criação de um sistema de tratamento de erros global que garante que, se for inválido, o utilizador seja redirecionado para a página de login, mantendo a integridade da aplicação.

##Acessibilidade, Responsividade e Segurança
Acessibilidade:  Utilização de atributos aria-label e contraste de cores adequado.

Responsividade: Grid CSS para garantir que a interface se adapta a dispositivos móveis e desktop.

Segurança: Uso de cors para controlo de acesso, hashing de passwords (bcryptjs) e validação de tokens (jsonwebtoken).

##APIs Externas
Google Maps API: Integrada para exibir a localização do CACA.

Gnews API: Utilizada para apresentar notícias académicas relevantes.

Integração: As APIs são chamadas via axios no front-end, garantindo que as chaves de API sejam mantidas em variáveis de ambiente (.env).
