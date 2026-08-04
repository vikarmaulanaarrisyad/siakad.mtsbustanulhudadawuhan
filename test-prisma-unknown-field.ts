import { db } from './src/lib/db';

async function main() {
  try {
    const payload = {
      name: '2050/2051',
      semester: 'Ganjil',
      startDate: new Date(),
      midtermDate: null,
      endDate: new Date(),
      isActive: true, // Unknown field to Prisma!
    };
    
    // Simulate what the old code did
    const r = await db.academicYear.create({
      data: payload as any // bypassing TypeScript
    });
    console.log("Success", r);
  } catch (e: any) {
    console.error("Error from Prisma:", e.message);
  }
}

main().catch(console.error);
