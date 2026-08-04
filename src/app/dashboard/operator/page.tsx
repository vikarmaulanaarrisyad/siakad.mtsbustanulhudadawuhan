import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Server,
  BookOpen,
  CalendarDays,
  Plus,
  ArrowRight,
  UserPlus,
  FileText,
  CalendarClock,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Minus,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function OperatorDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Overview</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xl">
            Welcome back, Admin Operator. Here is the current status of MTS Bustanul Huda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg">
            <CalendarDays className="mr-2 h-4 w-4" />
            Tahun Ajaran 2023/2024
          </Button>
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Tindakan Cepat
          </Button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        
        <Card className="border-none shadow-sm bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-bold tracking-wider text-slate-700 uppercase">Total Siswa</CardTitle>
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-slate-800 mb-4">452</div>
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-100/50 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              +4.2% dari tahun lalu
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <GraduationCap className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-bold tracking-wider text-slate-700 uppercase">Total Guru & Staf</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <GraduationCap className="h-4 w-4 text-blue-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-slate-800 mb-4">34</div>
            <div className="flex items-center text-xs font-medium text-slate-600 bg-slate-200/50 w-fit px-2 py-1 rounded-md">
              <Minus className="w-3 h-3 mr-1" />
              Tetap
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BookOpen className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-bold tracking-wider text-slate-700 uppercase">Kelas Aktif</CardTitle>
            <div className="bg-slate-200 p-2 rounded-lg">
              <GraduationCap className="h-4 w-4 text-slate-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-slate-800 mb-4">15</div>
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-100/50 w-fit px-2 py-1 rounded-md">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Semua jadwal terisi
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Server className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-bold tracking-wider text-slate-700 uppercase">Status Sistem</CardTitle>
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Server className="h-4 w-4 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-slate-800 mb-4">99.9%</div>
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-100/50 w-fit px-2 py-1 rounded-md">
              <Activity className="w-3 h-3 mr-1" />
              Operasional Normal
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Middle Section: Tingkatan & Kalender */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Data Siswa per Tingkatan */}
        <Card className="md:col-span-2 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <CardTitle className="text-base font-bold text-slate-800">Data Siswa per Tingkatan</CardTitle>
            <Link href="/dashboard/students" className="text-sm font-semibold text-emerald-700 flex items-center hover:underline">
              Lihat Detail <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Kelas VII */}
              <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-semibold text-slate-700">Kelas<br/>VII</div>
                  <div className="bg-emerald-100 text-emerald-800 font-bold px-3 py-2 rounded-lg text-sm text-center">
                    160<br/>Siswa
                  </div>
                </div>
                <Progress value={85} className="mb-2" trackClassName="h-2 bg-slate-100" indicatorClassName="bg-emerald-500" />
                <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                  <span>5 Rombel</span>
                  <span>Kapasitas 85%</span>
                </div>
              </div>

              {/* Kelas VIII */}
              <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-semibold text-slate-700">Kelas<br/>VIII</div>
                  <div className="bg-blue-100 text-blue-800 font-bold px-3 py-2 rounded-lg text-sm text-center">
                    145<br/>Siswa
                  </div>
                </div>
                <Progress value={80} className="mb-2" trackClassName="h-2 bg-slate-100" indicatorClassName="bg-blue-600" />
                <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                  <span>5 Rombel</span>
                  <span>Kapasitas 80%</span>
                </div>
              </div>

              {/* Kelas IX */}
              <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-semibold text-slate-700">Kelas<br/>IX</div>
                  <div className="bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-lg text-sm text-center">
                    147<br/>Siswa
                  </div>
                </div>
                <Progress value={82} className="mb-2" trackClassName="h-2 bg-slate-100" indicatorClassName="bg-slate-600" />
                <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                  <span>5 Rombel</span>
                  <span>Kapasitas 82%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kalender Akademik */}
        <Card className="md:col-span-1 border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold text-slate-800 tracking-wider uppercase">Kalender Akademik</CardTitle>
            <CalendarDays className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100">
              <div className="bg-red-100 text-red-700 rounded-lg p-2 flex flex-col items-center justify-center min-w-14 font-bold">
                <span className="text-xs">NOV</span>
                <span className="text-lg leading-none mt-1">12</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Ujian Tengah Semester</h4>
                <p className="text-xs text-slate-500 mt-1">Semua Tingkat</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2 flex flex-col items-center justify-center min-w-14 font-bold">
                <span className="text-xs">NOV</span>
                <span className="text-lg leading-none mt-1">25</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Hari Guru Nasional</h4>
                <p className="text-xs text-slate-500 mt-1">Upacara & Kegiatan Khusus</p>
              </div>
            </div>
            
            <div className="pt-2">
              <Link href="/dashboard/calendar" className="text-sm font-semibold text-emerald-700 flex items-center justify-center hover:underline w-full">
                Lihat Kalender Penuh <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Section: Aktivitas, Tindakan Cepat, Verifikasi */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Aktivitas Terkini */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800 tracking-wider uppercase">Aktivitas Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 pb-4">
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute -left-8.75 top-0 bg-emerald-100 p-1.5 rounded-full border-4 border-white">
                  <Activity className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Ahmad (Operator)</p>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">memperbarui data siswa untuk kelas IX-A.</p>
                  <div className="flex items-center text-xs text-slate-400 mt-2">
                    <Clock className="w-3 h-3 mr-1" /> 10 menit yang lalu
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <div className="absolute -left-8.75 top-0 bg-blue-100 p-1.5 rounded-full border-4 border-white">
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Siti (Staf TU)</p>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">mengunggah jadwal pelajaran baru semester ganjil.</p>
                  <div className="flex items-center text-xs text-slate-400 mt-2">
                    <Clock className="w-3 h-3 mr-1" /> 1 jam yang lalu
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative">
                <div className="absolute -left-8.75 top-0 bg-slate-200 p-1.5 rounded-full border-4 border-white">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Sistem</p>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">mendeteksi 3 pendaftaran siswa pindahan baru.</p>
                  <div className="flex items-center text-xs text-slate-400 mt-2">
                    <Clock className="w-3 h-3 mr-1" /> Kemarin, 14:30
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tindakan Cepat */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800 tracking-wider uppercase">Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-none shadow-none h-14 rounded-xl px-4 font-semibold text-sm">
              <UserPlus className="mr-3 h-5 w-5 text-emerald-600" />
              Tambah Siswa Baru
            </Button>
            <Button className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-800 border-none shadow-none h-14 rounded-xl px-4 font-semibold text-sm">
              <FileText className="mr-3 h-5 w-5 text-blue-600" />
              Generate Laporan Bulanan
            </Button>
            <Button className="w-full justify-start bg-slate-50 hover:bg-slate-100 text-slate-800 border-none shadow-none h-14 rounded-xl px-4 font-semibold text-sm">
              <CalendarClock className="mr-3 h-5 w-5 text-slate-600" />
              Update Jadwal Global
            </Button>
          </CardContent>
        </Card>

        {/* Verifikasi Tertunda */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold text-slate-800 tracking-wider uppercase">Verifikasi Tertunda</CardTitle>
            <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-none rounded-full px-2 py-1 text-xs">
              3 Baru
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    FA
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Fatimah Azzahra</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Pindahan - Kelas VIII</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
                    MR
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">M. Rizki Al-Hafiz</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Pindahan - Kelas VII</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link href="/dashboard/verifications" className="text-sm font-semibold text-emerald-700 flex items-center justify-center hover:underline w-full">
                Tinjau Semua <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
