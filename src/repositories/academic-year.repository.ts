import prisma from "@/lib/prisma";

export class AcademicYearRepository {
  async getPaginated(skip: number, take: number, where: any) {
    return prisma.academicYear.findMany({
      where,
      skip,
      take,
      orderBy: [
        { name: 'desc' },
        { semester: 'desc' }
      ]
    });
  }

  async count(where: any) {
    return prisma.academicYear.count({ where });
  }
}

export const academicYearRepository = new AcademicYearRepository();
