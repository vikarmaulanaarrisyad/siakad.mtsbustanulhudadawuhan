import { PrismaClient, Role } from '../src/generated/prisma2/client'
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

  // 6. Buat Tahun Pelajaran
  const academicYears = [
    {
      name: '2024/2025',
      semester: 'Ganjil',
      startDate: new Date('2024-07-15'),
      endDate: new Date('2024-12-20'),
      status: 'Draf',
    },
    {
      name: '2023/2024',
      semester: 'Ganjil',
      startDate: new Date('2023-07-17'),
      endDate: new Date('2023-12-22'),
      status: 'Aktif',
    },
    {
      name: '2022/2023',
      semester: 'Genap',
      startDate: new Date('2023-01-02'),
      endDate: new Date('2023-06-23'),
      status: 'Selesai',
    },
    {
      name: '2022/2023',
      semester: 'Ganjil',
      startDate: new Date('2022-07-18'),
      endDate: new Date('2022-12-23'),
      status: 'Selesai',
    },
    {
      name: '2021/2022',
      semester: 'Genap',
      startDate: new Date('2022-01-03'),
      endDate: new Date('2022-06-24'),
      status: 'Selesai',
    },
    {
      name: '2021/2022',
      semester: 'Ganjil',
      startDate: new Date('2021-07-19'),
      endDate: new Date('2021-12-24'),
      status: 'Selesai',
    },
    {
      name: '2020/2021',
      semester: 'Genap',
      startDate: new Date('2021-01-04'),
      endDate: new Date('2021-06-25'),
      status: 'Selesai',
    },
    {
      name: '2020/2021',
      semester: 'Ganjil',
      startDate: new Date('2020-07-20'),
      endDate: new Date('2020-12-25'),
      status: 'Selesai',
    }
  ]

  for (const ay of academicYears) {
    await prisma.academicYear.upsert({
      where: {
        name_semester: {
          name: ay.name,
          semester: ay.semester,
        },
      },
      update: ay,
      create: ay,
    })
  }
  console.log(`✅ Dibuat: ${academicYears.length} Tahun Pelajaran`)

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
