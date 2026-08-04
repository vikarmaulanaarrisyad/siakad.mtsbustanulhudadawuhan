import { db } from "@/lib/db";

export class AcademicYearRepository {
  async getPaginated(skip: number, take: number, where: any) {
    return db.academicYear.findMany({
      where,
      skip,
      take,
      orderBy: [
        { name: 'desc' },
        { semester: 'desc' }
      ]
    });
  }

  async getActive() {
    return db.academicYear.findFirst({
      where: { status: 'Aktif' }
    });
  }

  async count(where: any) {
    return db.academicYear.count({ where });
  }

  async setAllToInactive() {
    return db.academicYear.updateMany({
      where: { status: 'Aktif' },
      data: { status: 'Selesai' }
    });
  }

  async create(data: any) {
    return db.academicYear.create({ data });
  }
}

export const academicYearRepository = new AcademicYearRepository();
