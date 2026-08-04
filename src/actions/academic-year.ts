"use server";

import { academicYearService } from "@/services/academic-year.service";

export async function getAcademicYears(page = 1, limit = 10, search = '') {
  try {
    return await academicYearService.getPaginatedList(page, limit, search);
  } catch (error) {
    console.error("Error fetching academic years:", error);
    throw new Error("Gagal mengambil data tahun pelajaran");
  }
}
