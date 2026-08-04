import { PrismaClient } from '../generated/prisma2/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Force re-instantiation to pick up newly added models without restarting dev server
globalThis.prismaGlobal = prismaClientSingleton()
const prisma = globalThis.prismaGlobal

export default prisma
