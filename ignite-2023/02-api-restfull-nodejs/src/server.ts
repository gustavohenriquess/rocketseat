import fastify from 'fastify'
import { knex } from './database'
import crypto from 'crypto'

const app = fastify()

app.post('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Teste de transação',
      amount: 1000,
      session_id: crypto.randomUUID(),
    })
    .returning('*')

  return transaction
})

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app.listen({ port: 3333 }).then(() => console.log('Server is running...'))
