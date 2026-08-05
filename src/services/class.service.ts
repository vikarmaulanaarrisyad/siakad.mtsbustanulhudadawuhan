import { classRepository } from "@/repositories/class.repository";

export const classService = {
  getClassesList: async (academicYearId?: string, query?: string) => {
    return await classRepository.findAll(academicYearId, query);
  },

  getDashboardStats: async (academicYearId?: string) => {
    return await classRepository.getStats(academicYearId);
  }
};
