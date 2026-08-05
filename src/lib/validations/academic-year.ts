import { z } from "zod";

export const createAcademicYearSchema = z.object({
  name: z.string().min(1, "Tahun ajaran wajib diisi"),
  semester: z.string().min(1, "Semester wajib diisi"),
  startDate: z.date({
    message: "Tanggal mulai wajib diisi",
  }),
  registrationDate: z.date().optional().nullable(),
  midtermDate: z.date().optional().nullable(),
  endDate: z.date({
    message: "Tanggal akhir wajib diisi",
  }),
  isActive: z.boolean(),
});

export type CreateAcademicYearInput = z.infer<typeof createAcademicYearSchema>;

export const editAcademicYearSchema = z.object({
  name: z.string().min(1, "Tahun ajaran wajib diisi"),
  semester: z.string().min(1, "Semester wajib diisi"),
  startDate: z.date({
    message: "Tanggal mulai wajib diisi",
  }),
  registrationDate: z.date().optional().nullable(),
  midtermDate: z.date().optional().nullable(),
  endDate: z.date({
    message: "Tanggal akhir wajib diisi",
  }),
  status: z.string().min(1),
  hitungHariEfektif: z.boolean(), // UI toggle only for now
});

export type EditAcademicYearInput = z.infer<typeof editAcademicYearSchema>;
