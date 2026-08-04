import { db } from './src/lib/db';

async function main() {
  try {
    const r = await db.academicYear.create({
      data: {
        name: '2030/2031',
        semester: 'Ganjil',
        startDate: new Date(),
        midtermDate: null,
        endDate: new Date(),
        status: 'Aktif'
      }
    });
    console.log("Success", r);
  } catch (e) {
    console.error("Error from Prisma", e);
  }
}

main().catch(console.error);
