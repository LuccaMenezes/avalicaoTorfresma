# EXERCÍCIO DE AVALIAÇÃO: DESENVOLVEDOR FULLSTACK REACT

## Objetivo:

Criar uma aplicação web fullstack de um Dashboard de Tarefas com funcionalidade CRUD (Criar, Ler,
Atualizar, Deletar) usando React no front-end e Node.js no back-end. A aplicação deve permitir que os usuários
gerenciem tarefas, categorizem-nas e vejam um resumo visual de suas tarefas através de gráficos.

## Features
- Autenticação com JWT (JSON Web Token)
- CRUD de tarefas
- Dashboard
- Modo light/dark
- Responsivo
- Acessível

## Tecnologias Utilizadas

### Frontend

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Biblioteca:** [React](https://react.dev/)

**Rotas:** [React Router](https://reactrouter.com/en/main)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**HTTP Client:** [Axios](https://axios-http.com/)

### Backend

**Linguagem:** [Node.js](https://nodejs.org/pt)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Framework:** [Express](https://expressjs.com/)

**Autenticação:** [JWT](https://jwt.io/)

**ORM:** [Prisma](https://www.prisma.io/)

**Banco de Dados::** [PostgreSQL](https://www.postgresql.org/)

## Rodar Local - Frontend

Clone o projeto

```bash
  git clone https://github.com/LuccaMenezes/avalicaoTorfresma.git
```

Vá para o diretório do frontend

```bash
  cd frontend
```

Instalar dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodar Local - Backend

Vá para o diretório do backend

```bash
  cd backend
```

Instalar dependências

```bash
  npm install
```

Configure o arquivo .env

O Prisma usa um arquivo .env para armazenar as informações de conexão ao banco de dados. Verifique se existe um arquivo .env na raiz do projeto. Caso contrário, crie um com as seguintes variáveis:

```bash
  DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco"
```

Substitua os valores de acordo com suas configurações:

- seu_usuario: Nome de usuário do PostgreSQL.
- sua_senha: Senha do PostgreSQL.
- localhost: Host onde o PostgreSQL está rodando (use o IP ou hostname se não for local).
- 5432: Porta padrão do PostgreSQL.
- nome_do_banco: Nome do banco de dados.

Executar o migration

```bash
  npx prisma migrate dev
```

Inicie o servidor

```bash
  npm run dev
```
## Desenvolvedor

Desenvolvido por [@LuccaMenezes](https://github.com/LuccaMenezes)


