# Serveless

## O que é **Serveless** ?

- Arquitetura orientada a eventos
- Desenvolvimento de aplicação sem o gerenciamento de servidor
- Embora o nome seja **Serveless** existe sim um servidor por trás

### Quais as **Vantagens** ?

- Sem se preocupar com infraestrutura
- Auto Scaling
- Redução de Custos
- Paga somente pelo que usa (quantidade de execuções)
- Pouca configuração para produção

### Modelos de **Serveless**

- BaaS (Backend as a Service)

  - Firebase

- FaaS (Function as a Service)
  - AWS Lambda
  - Azure Function
  - Google Cloud Function

### Observações

> Não colocar funções que serão chamadas diversas vezes ao dia

## Framework **Serveless**

[Serveless Framework](https://www.serverless.com/pricing)

## AWS

### DynamoDB

- NoSQL
- Não precisa ficar criando infraestrutura, servidor, porta, segurança (tudo pela AWS)
- Obrigatório passar um ID
- Replica de informações por regiões
- Performatico
- Baixa Latência

#### Docs

- [Resource Types](https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html#amazondynamodb)
- [Attribution Definitions](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html)
