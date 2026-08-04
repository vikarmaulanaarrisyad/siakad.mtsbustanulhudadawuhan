import { createAcademicYear } from './src/actions/academic-year';

async function main() {
  try {
    const res = await createAcademicYear({
      name: "2031/2032",
      semester: "Ganjil",
      startDate: new Date().toISOString(),
      midtermDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      isActive: true
    });
    console.log("Action Response:", res);
  } catch (e) {
    console.error("Action caught:", e);
  }
}

main();
