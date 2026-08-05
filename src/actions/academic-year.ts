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

export async function createAcademicYear(data: { name: string, semester: string, startDate: string, registrationDate: string | null, midtermDate: string | null, endDate: string, isActive: boolean }) {
  // Force HMR recompile
  try {
    const payload = {
      name: data.name,
      semester: data.semester,
      startDate: new Date(data.startDate),
      registrationDate: data.registrationDate ? new Date(data.registrationDate) : null,
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

export async function updateAcademicYear(id: string, data: { name: string, semester: string, startDate: string, registrationDate: string | null, midtermDate: string | null, endDate: string, status: string }) {
  console.log("[updateAcademicYear] Incoming data:", data);
  try {
    const payload = {
      name: data.name,
      semester: data.semester,
      startDate: new Date(data.startDate),
      registrationDate: data.registrationDate ? new Date(data.registrationDate) : null,
      midtermDate: data.midtermDate ? new Date(data.midtermDate) : null,
      endDate: new Date(data.endDate),
      status: data.status
    };
    console.log("[updateAcademicYear] Processed payload:", payload);
    await academicYearService.updatePeriod(id, payload);
    revalidatePath("/dashboard/operator/academic-years");
    revalidatePath(`/dashboard/operator/academic-years/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating academic year (Action):", error);
    if (error?.code === "P2002") {
      return { success: false, error: `Tahun pelajaran ${data.name} semester ${data.semester} sudah ada di database.` };
    }
    return { success: false, error: error?.message || "Gagal memperbarui tahun pelajaran." };
  }
}
