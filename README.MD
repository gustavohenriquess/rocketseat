# Instalação do TypeScript
```
  // PARA INSTALAR
  npm init -y
  npm i -D typescript
  npm i -D @types/node
  npm i -D tsx
  npx tsc --init
```

```
  //PARA EXECUTAR
  npx tsc FILE PATH
  npx tsx SERVER_PATH
```

## Criação de Migration com knex
```
  // OLHAR PARA O SCRIPT KNEX NO PACKAGE
  npm run knex -- migrate:make create-documents
```



# RF
- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve poder obter um resumo da sua conta
- [x] O usuário deve poder listar todas as transações que já ocorreram
- [x] O usuário deve poder visualizar uma transação única

# RN
- [ ] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá
- [ ] Deve ser possível identificarmos o usuário entre as requisições
- [ ] o usuário só pode visualizar transações o qual ele criou

# RNF






# Testes

## Unitários
Testa exclusivamente uma unidade da sua aplicação, testa uma função que formata uma data, string, soma valores. testa a função sem contexto.

## Integração
Testa a comunicação entre 2 ou mais unidades. 

## e2e
Testes que basicamente simulam um usuário operando a aplicação.

Exemplo Frontend: Abre a pagina no navegador, digita o e-mail e senha, clica no botão de login.
Exemplo Backend: chamadas HTTP, Websockets. O teste é desde a rota até o banco de dados

## Pirâmide de testes

E2E (não dependem de nenhuma tecnologia, não dependem de arquitetura)
2000 testes -> Testes e2e -> 16min