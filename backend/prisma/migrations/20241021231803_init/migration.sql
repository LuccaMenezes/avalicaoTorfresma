-- CreateTable
CREATE TABLE "tb_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),

    CONSTRAINT "tb_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_tasks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "creationDate" TIMESTAMP NOT NULL,
    "completionDate" TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "tb_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tb_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "idRole" INTEGER,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE INDEX "FK_IDROLE_idx" ON "tb_users"("idRole");

-- AddForeignKey
ALTER TABLE "tb_tasks" ADD CONSTRAINT "tb_tasks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_tasks" ADD CONSTRAINT "tb_tasks_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "tb_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "tb_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Inserindo a role
INSERT INTO "tb_role" ("name") 
VALUES ('admin');

-- Inserindo as categorias
INSERT INTO "tb_categories" ("name", "description") 
VALUES 
('Pessoal', 'Categoria para tarefas pessoais'),
('Trabalho', 'Categoria para tarefas relacionadas ao trabalho'),
('Faculdade', 'Categoria para tarefas acadêmicas da faculdade'),
('Pesquisa', 'Categoria para tarefas de pesquisa e estudo'),
('Desenvolvimento', 'Categoria para tarefas de desenvolvimento de software'),
('Lazer', 'Categoria para atividades de lazer e hobbies'),
('Saúde', 'Categoria para atividades relacionadas à saúde e bem-estar'),
('Outros', 'Categoria para tarefas diversas que não se encaixam em outra categoria');

-- Inserindo um usuário
INSERT INTO "tb_users" ("name", "email", "password", "idRole") 
VALUES ('Admin User', 'admin@gmail.com', '$2b$10$ZgoN1jh/xdr0r4bvnti7.uoZpC9NB2h5GeNY0fDoQybD2WqdnXDgC', 1);

-- Inserindo as tarefas
INSERT INTO "tb_tasks" ("title", "description", "status", "creationDate", "completionDate", "id_user", "id_category") 
VALUES 
('Organizar a mesa de trabalho', 'Arrumar os papéis, canetas e materiais na mesa.', 'Pendente', '2024-08-01T03:00:00.000Z', null, 1, 2),
('Estudar para a prova de matemática', 'Estudar os tópicos mais importantes para a prova.', 'Concluída', '2024-08-02T03:00:00.000Z', '2024-08-02T03:00:00.000Z', 1, 3),
('Revisar os projetos do mês anterior', 'Avaliar o que foi realizado e o que pode melhorar.', 'Em andamento', '2024-08-03T03:00:00.000Z', null, 1, 5),
('Fazer compras de supermercado', 'Comprar itens essenciais para a casa.', 'Concluída', '2024-08-04T03:00:00.000Z', '2024-08-04T03:00:00.000Z', 1, 1),
('Preparar a apresentação para o trabalho', 'Criar slides e ensaiar a apresentação.', 'Pendente', '2024-08-05T03:00:00.000Z', null, 1, 2),
('Ir ao médico', 'Consulta de rotina para exames.', 'Concluída', '2024-08-06T03:00:00.000Z', '2024-08-06T03:00:00.000Z', 1, 7),
('Ler um livro', 'Terminar a leitura do livro escolhido.', 'Pendente', '2024-08-07T03:00:00.000Z', null, 1, 6),
('Cozinhar um jantar especial', 'Preparar uma refeição elaborada para a família.', 'Concluída', '2024-08-08T03:00:00.000Z', '2024-08-08T03:00:00.000Z', 1, 1),
('Fazer exercícios físicos', 'Realizar 30 minutos de atividade física.', 'Em andamento', '2024-08-09T03:00:00.000Z', null, 1, 7),
('Planejar a viagem de férias', 'Definir o destino e fazer as reservas necessárias.', 'Pendente', '2024-08-10T03:00:00.000Z', null, 1, 1),
('Estudar para a prova de História', 'Revisar os principais eventos históricos.', 'Concluída', '2024-08-11T03:00:00.000Z', '2024-08-11T03:00:00.000Z', 1, 3),
('Estudar para a prova de Física', 'Revisar as principais matérias.', 'Concluída', '2024-08-11T03:00:00.000Z', '2024-08-11T03:00:00.000Z', 1, 3),
('Participar de uma reunião de trabalho', 'Contribuir com ideias na reunião.', 'Pendente', '2024-08-12T03:00:00.000Z', null, 1, 2),
('Fazer um projeto de desenvolvimento', 'Trabalhar no projeto de software em andamento.', 'Em andamento', '2024-08-13T03:00:00.000Z', null, 1, 5),
('Organizar as fotos do celular', 'Selecionar e arquivar fotos antigas.', 'Concluída', '2024-08-14T03:00:00.000Z', '2024-08-14T03:00:00.000Z', 1, 1),
('Criar uma conta em um novo aplicativo', 'Baixar e configurar um novo aplicativo de produtividade.', 'Pendente', '2024-08-15T03:00:00.000Z', null, 1, 1),
('Verificar os e-mails', 'Responder e organizar e-mails importantes.', 'Em andamento', '2024-08-16T03:00:00.000Z', null, 1, 2),
('Verificar o teams', 'Responder e organizar o teams.', 'Em andamento', '2024-08-16T03:00:00.000Z', null, 1, 2),
('Assistir a um filme', 'Escolher e assistir a um filme novo.', 'Concluída', '2024-08-17T03:00:00.000Z', '2024-08-17T03:00:00.000Z', 1, 6),
('Fazer um relatório mensal', 'Compilar e apresentar resultados do mês.', 'Pendente', '2024-08-18T03:00:00.000Z', null, 1, 2),
('Praticar meditação', 'Realizar 10 minutos de meditação.', 'Concluída', '2024-08-19T03:00:00.000Z', '2024-08-19T03:00:00.000Z', 1, 7),
('Participar de um curso online', 'Completar módulos do curso em andamento.', 'Em andamento', '2024-08-20T03:00:00.000Z', null, 1, 4),
('Planejar um evento familiar', 'Definir data e atividades para o encontro.', 'Pendente', '2024-08-21T03:00:00.000Z', null, 1, 1),
('Organizar o orçamento mensal', 'Analisar despesas e receitas do mês.', 'Concluída', '2024-08-22T03:00:00.000Z', '2024-10-20T03:00:00.000Z', 1, 1),
('Revisar as metas do ano', 'Avaliar o progresso em relação às metas estabelecidas.', 'Pendente', '2024-08-23T03:00:00.000Z', null, 1, 2),
('Fazer uma limpeza na casa', 'Limpar os cômodos e organizar objetos.', 'Em andamento', '2024-08-24T03:00:00.000Z', null, 1, 1),
('Realizar um brainstorming', 'Gerar ideias para o novo projeto.', 'Pendente', '2024-08-25T03:00:00.000Z', null, 1, 5),
('Fazer um teste de habilidades', 'Participar de um teste para avaliar competências.', 'Concluída', '2024-08-26T03:00:00.000Z', '2024-08-26T03:00:00.000Z', 1, 4),
('Assistir a uma palestra', 'Participar de uma palestra online sobre tecnologia.', 'Pendente', '2024-08-27T03:00:00.000Z', null, 1, 4),
('Enviar o currículo atualizado', 'Atualizar e enviar o currículo para possíveis vagas.', 'Concluída', '2024-08-28T03:00:00.000Z', '2024-08-28T03:00:00.000Z', 1, 2),
('Cuidar das plantas', 'Regar e cuidar das plantas de casa.', 'Pendente', '2024-08-29T03:00:00.000Z', null, 1, 1),
('Estudar para a prova de inglês', 'Revisar o vocabulário e gramática.', 'Concluída', '2024-08-30T03:00:00.000Z', '2024-10-21T03:00:00.000Z', 1, 3),
('Visitar um amigo', 'Fazer uma visita a um amigo próximo.', 'Pendente', '2024-08-31T03:00:00.000Z', null, 1, 6),
('Fazer uma consulta psicológica', 'Participar da sessão agendada.', 'Concluída', '2024-08-31T03:00:00.000Z', '2024-10-21T03:00:00.000Z', 1, 7),
('Participar de um workshop', 'Aprender novas habilidades em um workshop.', 'Pendente', '2024-09-01T03:00:00.000Z', null, 1, 4),
('Organizar documentos importantes', 'Classificar e armazenar documentos.', 'Em andamento', '2024-09-02T03:00:00.000Z', null, 1, 1),
('Fazer um check-up na saúde', 'Consulta médica para verificar a saúde geral.', 'Concluída', '2024-09-03T03:00:00.000Z', '2024-10-22T03:00:00.000Z', 1, 7),
('Preparar uma refeição saudável', 'Cozinhar um prato saudável e nutritivo.', 'Pendente', '2024-09-04T03:00:00.000Z', null, 1, 1),
('Revisar contratos de trabalho', 'Avaliar os contratos atuais e possíveis renovações.', 'Em andamento', '2024-09-05T03:00:00.000Z', null, 1, 2),
('Desenvolver um novo recurso', 'Criar e testar um novo recurso para o software.', 'Pendente', '2024-09-06T03:00:00.000Z', null, 1, 5),
('Assistir uma série nova', 'Escolher uma nova série para assistir.', 'Concluída', '2024-09-07T03:00:00.000Z', '2024-10-22T03:00:00.000Z', 1, 6);
