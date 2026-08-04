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
}

export const academicYearService = new AcademicYearService();
