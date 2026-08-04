import { PrismaClient, Role } from '../src/generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Memulai proses seeding database...')

  // Hapus semua data yang ada (Opsional, matikan jika tidak ingin mereset data)
  // await prisma.user.deleteMany()

  // Hash password standar
  const defaultPassword = await bcrypt.hash('password123', 10)

  // 1. Buat Operator (Admin Utama)
  const operator = await prisma.user.upsert({
    where: { email: 'admin@madrasah.sch.id' },
    update: {},
    create: {
      email: 'admin@madrasah.sch.id',
      name: 'Operator Sistem',
      password: defaultPassword,
      role: Role.OPERATOR,
    },
  })
  console.log(`✅ Dibuat: ${operator.role} - ${operator.email}`)

  // 2. Buat Kepala Madrasah
  const kepsek = await prisma.user.upsert({
    where: { email: 'kepsek@madrasah.sch.id' },
    update: {},
    create: {
      email: 'kepsek@madrasah.sch.id',
      name: 'Kepala Madrasah',
      password: defaultPassword,
      role: Role.KEPSEK,
    },
  })
  console.log(`✅ Dibuat: ${kepsek.role} - ${kepsek.email}`)

  // 3. Buat Bendahara
  const bendahara = await prisma.user.upsert({
    where: { email: 'bendahara@madrasah.sch.id' },
    update: {},
    create: {
      email: 'bendahara@madrasah.sch.id',
      name: 'Bendahara Sekolah',
      password: defaultPassword,
      role: Role.BENDAHARA,
    },
  })
  console.log(`✅ Dibuat: ${bendahara.role} - ${bendahara.email}`)

  // 4. Buat Contoh Guru
  const guru = await prisma.user.upsert({
    where: { email: 'guru@madrasah.sch.id' },
    update: {},
    create: {
      email: 'guru@madrasah.sch.id',
      name: 'Bapak/Ibu Guru',
      password: defaultPassword,
      role: Role.GURU,
    },
  })
  console.log(`✅ Dibuat: ${guru.role} - ${guru.email}`)

  // 5. Buat Contoh Siswa
  const siswa = await prisma.user.upsert({
    where: { email: 'siswa@madrasah.sch.id' },
    update: {},
    create: {
      email: 'siswa@madrasah.sch.id',
      name: 'Siswa Contoh',
      password: defaultPassword,
      role: Role.SISWA,
    },
  })
  console.log(`✅ Dibuat: ${siswa.role} - ${siswa.email}`)

  console.log('🎉 Seeding selesai! Anda bisa login dengan password: password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error saat seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
