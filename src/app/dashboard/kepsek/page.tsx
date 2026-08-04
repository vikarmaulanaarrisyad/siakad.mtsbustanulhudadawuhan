import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Library, TrendingUp } from "lucide-react";

export default function KepsekDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Kepala Madrasah</h1>
        <p className="text-slate-500 mt-1">Ringkasan eksekutif performa dan operasional madrasah.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-linear-to-br from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-100">Total Siswa Aktif</CardTitle>
            <GraduationCap className="h-5 w-5 text-indigo-100" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">452</div>
            <p className="text-xs text-indigo-200 mt-1">+12 dari tahun lalu</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Kinerja Guru</CardTitle>
            <Library className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">92%</div>
            <p className="text-xs text-slate-500 mt-1">Tingkat kehadiran guru</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
