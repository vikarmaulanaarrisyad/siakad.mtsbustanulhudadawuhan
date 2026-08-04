import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, Calendar, CheckSquare } from "lucide-react";

export default function GuruDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Guru</h1>
        <p className="text-slate-500 mt-1">Selamat datang! Berikut ringkasan jadwal dan kelas Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-linear-to-br from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-100">Jam Mengajar Hari Ini</CardTitle>
            <Calendar className="h-5 w-5 text-indigo-100" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-indigo-200 mt-1">Mata Pelajaran Aktif</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Siswa Diajar</CardTitle>
            <Users className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">120</div>
            <p className="text-xs text-slate-500 mt-1">Dari 4 Kelas Berbeda</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tugas Terkumpul</CardTitle>
            <CheckSquare className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">85%</div>
            <p className="text-xs text-slate-500 mt-1">Rata-rata Pengumpulan Tugas</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Materi Tersedia</CardTitle>
            <BookOpen className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">12</div>
            <p className="text-xs text-slate-500 mt-1">Modul Pembelajaran</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Jadwal Mengajar Hari Ini</CardTitle>
            <CardDescription>
              Daftar kelas yang harus Anda ajar hari ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Matematika (VII-A)', 'Matematika (VII-B)', 'Fisika Dasar (VIII-A)', 'Fisika Dasar (VIII-B)'].map((kelas, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {i+1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{kelas}</p>
                      <p className="text-sm text-slate-500">Jam ke-{i+1} (07:00 - 08:30)</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:underline">
                    Isi Presensi
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
