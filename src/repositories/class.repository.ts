import { db } from "@/lib/db";

export const classRepository = {
  findAll: async (academicYearId?: string, query?: string) => {
    const where: any = {};
    
    if (academicYearId && academicYearId !== 'all') {
      where.academicYearId = academicYearId;
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { homeroom: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    return await db.classRoom.findMany({
      where,
      include: {
        homeroom: true,
        _count: {
          select: { students: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  },

  getStats: async (academicYearId?: string) => {
    const where: any = {};
    if (academicYearId && academicYearId !== 'all') {
      where.academicYearId = academicYearId;
    }

    const classes = await db.classRoom.findMany({
      where,
      include: {
        _count: {
          select: { students: true },
        },
      },
    });

    const totalClasses = classes.length;
    const totalStudents = classes.reduce((sum, cls) => sum + cls._count.students, 0);
    const averageStudents = totalClasses > 0 ? (totalStudents / totalClasses).toFixed(1) : "0";
    
    const totalCapacity = classes.reduce((sum, cls) => sum + cls.capacity, 0);
    const availableSeats = totalCapacity - totalStudents;

    return {
      totalClasses,
      totalStudents,
      averageStudents,
      availableSeats: availableSeats > 0 ? availableSeats : 0,
    };
  }
};
