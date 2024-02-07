# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível cadastrar um novo usuário.
- [x] Dever ser possível se autenticar na aplicação.
- [x] Deve ser possível obter o perfil de um usuário logado.
- [x] Deve ser possível obter o número de check-ins realizados por um usuário logado.
- [x] Deve ser possível obter seu histórico de check-ins.
- [x] Deve ser possível buscar academias próximas.
- [x] Deve ser possível o usuário buscar academias pelo nome.
- [x] Deve ser possível realizar check-in em uma academia.
- [x] Deve ser possível validar o check-in de um usuário.
- [x] Deve ser possível cadastrar uma academia.

## RNs (Regras de Negócio)
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [x] O usuário não pode fazer 2 check-ins no mesmo dia.
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [x] O check-in só pode ser validado até 20 minutos após criado.
- [x] O check-in só pode ser validado por administradores.
- [x] A academia só pode ser cadastrada por administradores.

## RNFs (Requisitos Não Funcionais)
- [x] A senha do usuário precisa estar criptografada.
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgeSQL.
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página.
- [x] O usuário deve ser identificado por um JWT (JSON Web Token).

## TODO
- [Update vitest config](https://app.rocketseat.com.br/h/forum/node-js/caaa09c4-2e10-4597-892d-29336c6c2041)



## Anotações

### Arquivo .npmrc
configura o npm para sempre salvar as dependências com exact version


### Prisma
- npm i prisma -D
- npx prisma init
- npx prisma generate - para gerar os arquivos de typescript (tipagem)


### Docker

```
docker run -d --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

### In Memory test Database

[Artigo do Martin Fowler](https://martinfowler.com/bliki/InMemoryTestDatabase.html)

#### Vantagens
- Representação dos bancos de dados
- foco dos testes em Use-Case
- Testes executados mais rapidos

### JWT
[jwt.io](https://jwt.io/)

### GH Actions

[GH Actions MarketPlace](https://github.com/marketplace?type=actions)
[GH Actions Postgres Container](https://docs.github.com/en/actions/using-containerized-services/creating-postgresql-service-containers)
> Lembrar de ver as opções de health check se não usar a verão da bitnami.