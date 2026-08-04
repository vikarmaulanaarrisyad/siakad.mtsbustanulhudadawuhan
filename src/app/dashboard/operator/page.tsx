import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, GraduationCap, Library, BookOpen } from "lucide-react";

export default function OperatorDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Operator</h1>
        <p className="text-slate-500 mt-1">Ringkasan sistem dan statistik akademik hari ini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Siswa Card */}
        <Card className="border-none shadow-sm bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Siswa Aktif</CardTitle>
            <GraduationCap className="h-5 w-5 text-blue-100" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">452</div>
            <p className="text-xs text-blue-200 mt-1">Siswa Terdaftar Semester Ini</p>
          </CardContent>
        </Card>

        {/* Guru Card */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Guru</CardTitle>
            <Library className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">42</div>
            <p className="text-xs text-slate-500 mt-1">Guru Tetap dan Honorer</p>
          </CardContent>
        </Card>

        {/* Rombel Card */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Rombongan Belajar</CardTitle>
            <BookOpen className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">18</div>
            <p className="text-xs text-slate-500 mt-1">Kelas Aktif Saat Ini</p>
          </CardContent>
        </Card>

        {/* Pengguna Card */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Pengguna</CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">512</div>
            <p className="text-xs text-slate-500 mt-1">Akun Terdaftar di Sistem</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Aktivitas Sistem</CardTitle>
            <CardDescription>
              Aktivitas terbaru dari pengguna aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-75 flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mx-6 mb-6">
            <p className="text-sm">Grafik aktivitas akan ditampilkan di sini</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Log Masuk Terbaru</CardTitle>
            <CardDescription>
              Daftar pengguna yang baru saja mengakses sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    U
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-sm font-medium leading-none">Pengguna {i}</p>
                    <p className="text-xs text-slate-500 mt-1">user{i}@madrasah.sch.id</p>
                  </div>
                  <div className="text-xs text-slate-400">
                    {i * 5} mnt lalu
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
