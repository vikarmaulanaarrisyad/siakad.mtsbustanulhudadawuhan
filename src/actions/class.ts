"use server";

import { classService } from "@/services/class.service";

export async function getClasses(academicYearId?: string, query?: string) {
  try {
    return await classService.getClassesList(academicYearId, query);
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw new Error("Gagal mengambil data kelas");
  }
}

export async function getClassStats(academicYearId?: string) {
  try {
    return await classService.getDashboardStats(academicYearId);
  } catch (error) {
    console.error("Error fetching class stats:", error);
    throw new Error("Gagal mengambil statistik kelas");
  }
}
