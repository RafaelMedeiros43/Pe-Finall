# BACKEND 

## Configuração

### 1 - Clonar ou instalar a pasta do projeto
### 2 - Instalar os pacotes necessários
Abrir um terminal e colar o seguinte comando:
npm install express sequelize mysql2 jsonwebtoken bcryptjs cors dotenv --save && npm install nodemon --save-dev
### 3 - Abrir o mySQL Workbench e criar uma base de dados nova para o CACA
Conectar-se no mySQL à Database e criar um schemas novo
### 4 - .env
Trocar o nome do ficheiro .env.example para apenas .env;
Preencher as informações do ficheiro .env:
### 5 - Inicializar o servidor
Abrir o terminal e colocar o seguinte comando:
npm run dev


## Pacotes utilizados
* express
* mysql2
* sequelize
* jsonwebtoken
* bcryptjs
* cors
* dotenv
* nodemon


## Estrutura do projeto
```text
caca-FinalBackEnd/
├── node_modules/         
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   └── models/
│       └── User.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## DATABASE

Foi utilizado o mySQL e o Sequelize para guardar os valores dos utilizadores


## ENDPOINTS implementadas

| Métodos |       Endpoint        |                Middleware               | Descrição |
| :---    | :---                 | :---                                    | :--- |
| POST    | /api/auth/register   | Público                                 | Permite registar novos utilizadores no site |
| POST    | /api/auth/login      | Público                                 | Permite logar utilizadores no site |
| GET     | /api/user/profile    | authenticateToken                       | Retorna os dados do perfil de um utilizador |
| PUT     | /api/user/profile    | authenticateToken                       | Atualiza os dados do perfil de um utilizador |
| GET     | /api/user/all        | authenticateToken + authorizeAdmin      | Lista todos os utilizadores guardados na base de dados |
| DELETE  | /api/user/:id        | authenticateToken + authorizeAdmin      | Elimina um utilizador com o id especifico |
| GET     | /api/event/