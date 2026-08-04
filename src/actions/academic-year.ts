"use server";

import { academicYearService } from "@/services/academic-year.service";
import { revalidatePath } from "next/cache";

export async function getAcademicYears(page = 1, limit = 10, search = '') {
  try {
    return await academicYearService.getPaginatedList(page, limit, search);
  } catch (error) {
    console.error("Error fetching academic years:", error);
    throw new Error("Gagal mengambil data tahun pelajaran");
  }
}

export async function getActiveAcademicYear() {
  try {
    return await academicYearService.getActivePeriod();
  } catch (error) {
    console.error("Error fetching active academic year:", error);
    return null;
  }
}

export async function createAcademicYear(data: { name: string, semester: string, startDate: string, midtermDate: string | null, endDate: string, isActive: boolean }) {
  // Force HMR recompile
  try {
    console.log("createAcademicYear called with:", data);
    const payload = {
      name: data.name,
      semester: data.semester,
      startDate: new Date(data.startDate),
      midtermDate: data.midtermDate ? new Date(data.midtermDate) : null,
      endDate: new Date(data.endDate),
      isActive: data.isActive
    };
    await academicYearService.createNewPeriod(payload);
    revalidatePath("/dashboard/operator/academic-years");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating academic year (Action):", error);
    if (error?.code === "P2002") {
      return { success: false, error: `Tahun pelajaran ${data.name} semester ${data.semester} sudah ada di database.` };
    }
    return { success: false, error: error?.message || "Gagal membuat tahun pelajaran baru." };
  }
}
