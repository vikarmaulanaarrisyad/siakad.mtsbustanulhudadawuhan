import { academicYearRepository } from "../repositories/academic-year.repository";

export class AcademicYearService {
  async getPaginatedList(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { semester: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const total = await academicYearRepository.count(where);
    const data = await academicYearRepository.getPaginated(skip, limit, where);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      metadata: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  async getActivePeriod() {
    return await academicYearRepository.getActive();
  }

  async createNewPeriod(data: { name: string, semester: string, startDate: Date, registrationDate: Date | null, midtermDate: Date | null, endDate: Date, isActive: boolean }) {
    // Force HMR recompile
    // Jika user mencentang toggle "Setel sebagai periode aktif", ubah semua yang aktif menjadi selesai
    if (data.isActive) {
      await academicYearRepository.setAllToInactive();
    }

    // Buat data baru
    return await academicYearRepository.create({
      name: data.name,
      semester: data.semester,
      startDate: data.startDate,
      registrationDate: data.registrationDate,
      midtermDate: data.midtermDate,
      endDate: data.endDate,
      status: data.isActive ? 'Aktif' : 'Draf'
    });
  }
  async getPeriodById(id: string) {
    return await academicYearRepository.getById(id);
  }

  async updatePeriod(id: string, data: { name: string, semester: string, startDate: Date, registrationDate: Date | null, midtermDate: Date | null, endDate: Date, status: string }) {
    if (data.status === 'Aktif') {
      await academicYearRepository.setAllToInactive();
    }

    return await academicYearRepository.update(id, {
      name: data.name,
      semester: data.semester,
      startDate: data.startDate,
      registrationDate: data.registrationDate,
      midtermDate: data.midtermDate,
      endDate: data.endDate,
      status: data.status
    });
  }
}

export const academicYearService = new AcademicYearService();
