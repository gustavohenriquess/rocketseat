import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'crypto'

export async function helloRoutes(app: FastifyInstance) {
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
}
