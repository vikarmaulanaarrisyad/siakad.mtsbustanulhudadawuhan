import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MoreVertical, 
  DoorOpen, 
  Users, 
  PieChart, 
  Armchair,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getClasses, getClassStats } from "@/actions/class";
import { getAcademicYears, getActiveAcademicYear } from "@/actions/academic-year";
import ClassFilter from "./class-filter";

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.q === 'string' ? params.q : '';
  const selectedYear = typeof params.year === 'string' ? params.year : 'all';

  // Fetch academic years for dropdown (limit 100 for now to get mostly all)
  const academicYearsData = await getAcademicYears(1, 100, "");
  const academicYears = academicYearsData.data;

  // Fetch actual class data and stats
  const classesData = await getClasses(selectedYear, search);
  const stats = await getClassStats(selectedYear);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-800">Manajemen Kelas</h1>
          <div className="h-6 w-px bg-slate-300 hidden md:block"></div>
          {/* We'll use a Client Component for the Select to handle routing */}
          <ClassFilter academicYears={academicYears} currentYear={selectedYear} />
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-green-700 hover:bg-green-800 text-white shadow-sm rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kelas Baru
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-green-100/80 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <DoorOpen className="text-green-700 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">{stats.totalClasses}</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Kelas Aktif</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-blue-100/80 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Users className="text-blue-700 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">{stats.totalStudents}</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Siswa</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-slate-200/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <PieChart className="text-slate-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">{stats.averageStudents}</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Rata-rata Siswa/Kelas</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-rose-100/80 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Armchair className="text-rose-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">{stats.availableSeats}</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Sisa Kursi Tersedia</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Daftar Kelas</h3>
            <p className="text-sm text-slate-500 mt-0.5">Kelola penempatan siswa dan wali kelas.</p>
          </div>
          <div className="w-full sm:w-80">
            <SearchInput placeholder="Cari kelas atau wali..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold text-slate-500 text-xs tracking-wider uppercase w-40 pl-8">Nama Kelas</TableHead>
                <TableHead className="font-bold text-slate-500 text-xs tracking-wider uppercase w-32">Tingkat</TableHead>
                <TableHead className="font-bold text-slate-500 text-xs tracking-wider uppercase w-72">Wali Kelas</TableHead>
                <TableHead className="font-bold text-slate-500 text-xs tracking-wider uppercase min-w-50">Kapasitas & Terisi</TableHead>
                <TableHead className="font-bold text-slate-500 text-xs tracking-wider uppercase text-right pr-8 w-20">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                    Tidak ada data kelas ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                classesData.map((cls) => {
                  const filled = cls._count.students;
                  const capacity = cls.capacity;
                  const percentage = capacity > 0 ? (filled / capacity) * 100 : 0;
                  const isFull = filled >= capacity;
                  
                  return (
                    <TableRow key={cls.id} className="hover:bg-slate-50/30">
                      <TableCell className="pl-8 font-bold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-6 rounded-full ${cls.color || 'bg-slate-400'}`}></div>
                          {cls.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 hover:bg-blue-100/50 font-medium rounded-full px-3 shadow-none border-none">
                          {cls.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-slate-100">
                            <AvatarImage src={cls.homeroom?.image || undefined} alt={cls.homeroom?.name || 'Unknown'} />
                            <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                              {cls.homeroom?.name ? cls.homeroom.name.substring(0, 2).toUpperCase() : '??'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">{cls.homeroom?.name || 'Belum Ditentukan'}</span>
                            <span className="text-[10px] text-slate-400">NIP. {cls.homeroom?.email || '-'}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5 w-full max-w-xs pr-4">
                          <div className="flex justify-between text-xs items-end">
                            <span className="font-semibold text-slate-800">{filled} Siswa</span>
                            <span className="text-slate-400 text-[10px]">Max {capacity}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <div 
                              className={`h-full rounded-full ${isFull ? "bg-red-600" : "bg-green-700"}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-[10px] font-semibold ${isFull ? "text-red-600" : "text-green-700"}`}>
                            {isFull ? "Penuh" : `Tersedia ${capacity - filled} kursi`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
    </div>
  );
}
