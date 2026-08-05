import { PrismaClient } from '../generated/prisma2/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// We create a fresh instance specifically to bypass the stubborn Next.js dev server cache
export const db = new PrismaClient({ adapter })

// Force reload 2