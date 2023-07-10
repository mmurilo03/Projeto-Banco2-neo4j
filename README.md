# Projeto de manipulação da API do Google Maps, com CRUD de eventos e níveis de usuários.

## Sobre o projeto
#### O projeto consiste em uma aplicação com conexão com banco de dados. Com diferentes níveis de permissão, sendo usuários comuns e administrador.
### O administrador marca um local no maps, dá um nome para esse evento, descrição, data de início e fim e salva, a informação passada por ele é salva em um banco de dados. Também há funções para remoção e edição dos eventos.
### O usuário vê todos os eventos listados e pode curtir os eventos, apertando no coração. Pós isso, o sistema alimenta a aba de recomendações com eventos que os usuários que curtiram esse mesmo evento. O usuário pode ver esses eventos clicando em recomendações.

## Requisitos para execução da aplicação
- Mongo DB.
- Neo4j.
- Preencher o .env.exemple com dados do banco.
- Executar a aplicação com npm start e live server ou outra extensão que utilize.

## Ferramentas utilizadas

- [API DO GOOGLE MAPS](https://developers.google.com/maps/documentation/javascript/overview?hl=pt-br)
- HTML, CSS, JAVASCRIPT 
- NODE [EXPRESS, MONGO, NODEMON, CORS]
- DOCKER [MONGO, NEO4J]

## Passo a passo de execução

- Clone o repositório
- Abra no vscode ou outra IDE
- Abra o terminal, digite npm i para baixar todas as dependências
- Crie um arquivo .env e pegue o preset que está em .env.exemple e preencha com o endereço do seu banco de dados
- No docker, inicie o mongo


