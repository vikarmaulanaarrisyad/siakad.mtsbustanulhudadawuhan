import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletCards, CreditCard, PiggyBank, History } from "lucide-react";

export default function BendaharaDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Bendahara</h1>
        <p className="text-slate-500 mt-1">Ringkasan keuangan dan status pembayaran siswa.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-linear-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Saldo Kas Masuk</CardTitle>
            <WalletCards className="h-5 w-5 text-emerald-100" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp 12.5M</div>
            <p className="text-xs text-emerald-200 mt-1">Bulan Ini</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Menunggu Verifikasi</CardTitle>
            <CreditCard className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">24</div>
            <p className="text-xs text-slate-500 mt-1">Transaksi Siswa</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
