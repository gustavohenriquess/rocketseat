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