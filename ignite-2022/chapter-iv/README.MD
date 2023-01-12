## Testes Unitários

- testes de sucessos e erros
- são testes de serviços e regras de negocio
- Cria testes com as regras de negócios em cima dos casos de uso (use case)

## Teste de Integração

- teste da aplicação completa
- desde a requisição da rota a resposta
- conexão com o banco de dados (banco de teste)
- serviços externos, serviços de e-mail, API/Bibliotecas externas
- -> Routes -> Controllers -> useCases -> Repository
- <- Repository <- useCases <- Controllers <- Routes

### TDD - Test Driven Development

## Jest

### Configs mudadas

- bail para true
- preset para ts-node
- testMatch para ["**/*.spec.ts"]
