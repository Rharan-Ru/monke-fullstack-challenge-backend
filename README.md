
# Challenger

Bem-vindo ao nosso projeto **Gerenciador de Entregas**! Este é um sistema simples que permite que os usuários se cadastrem, façam login e gerenciem entregas com facilidade. O projeto backend foi construído com **NestJS**, uma estrutura poderosa para Node.js que promove uma arquitetura escalável e organizada.

### Link para o respositório frontend
https://github.com/Rharan-Ru/monke-fullstack-challenge-frontend

## Funcionalidades

- CRUD Usuários
- CRUD Clients
- CRUD Address
- Autenticação JWT

## Stack utilizada

**Back-end:** Node, NestJs, Swagger, TypeORM, MariaDB, JWT, Jest, Typescript


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, você pode encontrar um exemplo no arquivo .env.example:

#### Development
`NODE_ENV=development`

`FRONTEND_URL=http://localhost:4000`

### Database

`DB_TYPE=mariadb`

`DB_HOST=localhost`

`DB_PORT=3306`

`DB_USERNAME=root`

`DB_PASSWORD=root`

`DB_DATABASE=challenge`

#### JWT

`SECRET_KEY=challenge`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Rharan-Ru/monke-fullstack-challenge-backend.git
```

Entre no diretório do projeto

```bash
  cd monke-fullstack-challenge-backend
```

Verifique se o docker está instalado na sua máquina, primeiro de permissão e instale o docker caso nescessário, execute o comando na pasta root do projeto

```bash
  chmod +x install_docker.sh
  ./install_docker.sh
```

Inicie o servidor com docker compose (sem o hífen)

```bash
  docker compose -f docker-compose-dev.yml up
```

Rode as migrações do banco de dados após o backend estar rodando

```bash
  npm run migration:run
```

## 📖 Acessando a Documentação da API com Swagger

Após iniciar o servidor, você pode acessar a documentação da API através do Swagger, que fornece uma interface interativa para explorar as rotas disponíveis. 

### Passos para Acessar

1. **Inicie o servidor** (se ainda não o fez):

   ```bash
    docker compose -f docker-compose-dev.yml up
   ```
2. **Acesse a url do swagger**

    ```
    http://localhost:3000/api
    ```
## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

Para ver a cobertura de testes utilize

```bash
  npm run test:cov
```
## Screenshots

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/ChallengeLogin.png)

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/ChallengeMain.png)

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/SwaggerUIChallenge.png)
## 🏗️ Arquitetura e Decisões Técnicas

Este projeto foi estruturado e pensado para garantir escalabilidade, organização e facilidade de manutenção. Abaixo estão as principais decisões técnicas tomadas ao longo do desenvolvimento:

### 1️⃣ Estrutura de Pastas: Clean Architecture
Optei por uma estrutura de pastas inspirada na **Clean Architecture** para garantir uma organização clara e uma escalabilidade fácil. Esta abordagem facilita a localização dos códigos, permitindo modificações com mais simplicidade e sem comprometer a legibilidade do projeto. Além disso, a separação de responsabilidades promove uma base mais sólida, preparada para futuras abstrações ou integrações mais complexas, caso necessário.

### 2️⃣ TypeORM
Escolhi o **TypeORM** como ORM (Object-Relational Mapping) pela sua simplicidade e excelente suporte ao **TypeScript**. O **NestJS** possui integração nativa com o TypeORM, o que facilita a configuração e permite criar consultas e relações de forma intuitiva e eficiente. Isso agiliza o desenvolvimento e reduz a complexidade na manipulação dos dados.

### 3️⃣ Abordagem SaaS com Multitenancy
Ao invés de usar uma única entidade de clients, optei por um modelo **SaaS (Software as a Service)**, onde cada usuário pode criar e gerenciar múltiplos clientes. Isso garante que os dados de cada usuário sejam isolados, permitindo que cada um utilize a aplicação sem interferir nos dados de outros usuários. Essa abordagem fortalece a segurança e flexibilidade do sistema, permitindo que ele seja escalável conforme o crescimento da base de usuários.

### 4️⃣ Testes com Jest
Optei por utilizar **Jest** para os testes do projeto, já que ele é nativamente suportado pelo **NestJS**. A integração é fácil e direta, o que torna o processo de criação de testes conveniente. Para um projeto simples como este, o **Jest** oferece a cobertura necessária para garantir a confiabilidade do código sem a complexidade de setups adicionais.

### 5️⃣ Dockerização
A **dockerização** do projeto foi uma escolha estratégica para simplificar o processo de deploy e garantir que o ambiente de desenvolvimento seja o mais consistente possível. Com o **Docker**, qualquer pessoa pode rodar o projeto sem se preocupar com o versionamento de dependências ou a configuração de serviços externos. Isso melhora a portabilidade e diminui os riscos de problemas de compatibilidade em diferentes máquinas.

### 6️⃣ Separação de Repositórios: Backend e Frontend
Para evitar a criação de um monólito, separei o **backend** e o **frontend** em repositórios diferentes. Essa separação permite um fluxo de deploy mais simplificado e possibilita o uso de plataformas específicas para cada parte da aplicação. No caso deste projeto, o **Railway** foi utilizado para o backend e o **Vercel** para o frontend. Isso também oferece maior flexibilidade para escalar e manter cada parte da aplicação de maneira independente.
