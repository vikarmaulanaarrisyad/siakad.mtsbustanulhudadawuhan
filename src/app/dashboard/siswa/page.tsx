import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Calendar, TrendingUp } from "lucide-react";

export default function SiswaDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Siswa</h1>
        <p className="text-slate-500 mt-1">Ringkasan aktivitas akademik dan nilai Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-linear-to-br from-teal-500 to-teal-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-teal-100">Kehadiran</CardTitle>
            <Calendar className="h-5 w-5 text-teal-100" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">95%</div>
            <p className="text-xs text-teal-200 mt-1">Semester Ganjil</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Mata Pelajaran</CardTitle>
            <Book className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">14</div>
            <p className="text-xs text-slate-500 mt-1">Total Mata Pelajaran</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tugas & Ujian</CardTitle>
            <FileText className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">3</div>
            <p className="text-xs text-slate-500 mt-1">Tugas Belum Selesai</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Peringkat Kelas</CardTitle>
            <TrendingUp className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">5</div>
            <p className="text-xs text-slate-500 mt-1">Dari 32 Siswa</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
