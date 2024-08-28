# Challenge DDD

[Desafio](https://efficient-sloth-d85.notion.site/Atividade-Mapeando-o-dom-nio-38963358ffd74289b824ff73b187165d)

# Resposta

## Entidades
  - Produto
    - id
    - name
    - tagId

  - Vendas
    - id
    - saleDate

  - Estoque
    - id
    - minLimit
    - NextPurchase
    - produtoID
    - description
  
  - Histórico
  - Notification
  - Email
  - Compras
    - id
    - purchaseDate
    - deliveryDate


## Casos de Uso
  - Rastreio de produto
  - Alerta de pouco estoque
  - Histórico de vendas por periodo
  - Histórico de Estoque por periodo
  - Lucro por produto e periodo
  - Gerar ordem de compra
  - Atualizar data de entrega
  - Gerar Numero de itens do pedido de acordo com os históricos