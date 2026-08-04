import { db } from './src/lib/db';

async function main() {
  try {
    const r = await db.academicYear.updateMany({
      where: { status: 'Aktif' },
      data: { status: 'Selesai' }
    });
    console.log("Success", r);
  } catch (e) {
    console.error("Error from Prisma", e);
  }
}

main().catch(console.error);
