import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const classesData = [
  {
    id: "1",
    name: "VII-A",
    level: "Kelas VII",
    teacher: {
      name: "Siti Nurhaliza, S.Pd",
      nip: "198503122010012011",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    capacity: 32,
    filled: 32,
    color: "bg-green-600"
  },
  {
    id: "2",
    name: "VII-B",
    level: "Kelas VII",
    teacher: {
      name: "Budi Santoso, M.Pd",
      nip: "197811232005011003",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    capacity: 32,
    filled: 30,
    color: "bg-blue-600"
  },
  {
    id: "3",
    name: "VIII-A",
    level: "Kelas VIII",
    teacher: {
      name: "Ahmad Fauzan, S.Ag",
      nip: "199008172019031005",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    capacity: 32,
    filled: 31,
    color: "bg-slate-600"
  }
];

export default function ClassesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-800">Manajemen Kelas</h1>
          <div className="h-6 w-px bg-slate-300 hidden md:block"></div>
          <Select defaultValue="2024/2025-genap">
            <SelectTrigger className="w-48 bg-slate-100/50 border-none rounded-full h-9 font-medium text-slate-700 shadow-none">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024/2025-genap">2024/2025 - Genap</SelectItem>
              <SelectItem value="2024/2025-ganjil">2024/2025 - Ganjil</SelectItem>
            </SelectContent>
          </Select>
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
            <h2 className="text-4xl font-bold text-slate-800 mb-1">18</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Kelas Aktif</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-blue-100/80 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Users className="text-blue-700 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">542</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Siswa</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-slate-200/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <PieChart className="text-slate-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">30.1</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Rata-rata Siswa/Kelas</p>
          </div>
        </div>

        <div className="bg-slate-50/30 p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="bg-rose-100/80 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Armchair className="text-rose-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">34</h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Sisa Kursi Tersedia</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Daftar Kelas (Tahun Ajaran 2024/2025 - Genap)</h3>
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
              {classesData.map((cls) => {
                const percentage = (cls.filled / cls.capacity) * 100;
                const isFull = cls.filled >= cls.capacity;
                return (
                  <TableRow key={cls.id} className="hover:bg-slate-50/30">
                    <TableCell className="pl-8 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 rounded-full ${cls.color}`}></div>
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
                          <AvatarImage src={cls.teacher.avatar} alt={cls.teacher.name} />
                          <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                            {cls.teacher.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{cls.teacher.name}</span>
                          <span className="text-[10px] text-slate-400">NIP. {cls.teacher.nip}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5 w-full max-w-xs pr-4">
                        <div className="flex justify-between text-xs items-end">
                          <span className="font-semibold text-slate-800">{cls.filled} Siswa</span>
                          <span className="text-slate-400 text-[10px]">Max {cls.capacity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full rounded-full ${isFull ? "bg-red-600" : "bg-green-700"}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-semibold ${isFull ? "text-red-600" : "text-green-700"}`}>
                          {isFull ? "Penuh" : `Tersedia ${cls.capacity - cls.filled} kursi`}
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
              })}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500 pl-4">
            Menampilkan 1-10 dari 18 kelas
          </span>
          <div className="flex items-center gap-1 pr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-green-700 text-white hover:bg-green-800 hover:text-white border-green-700 shadow-sm">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-600 hover:bg-slate-100">
              2
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
