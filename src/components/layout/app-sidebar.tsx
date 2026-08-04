"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  GraduationCap, 
  Library, 
  WalletCards,
  UserCheck
} from "lucide-react";
import { useSession } from "next-auth/react";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getRoleMenus = (role: string) => {
    const menus = [
      { name: "Ringkasan", href: `/dashboard/${role.toLowerCase()}`, icon: Home },
    ];

    if (role === "OPERATOR" || role === "KEPSEK") {
      menus.push(
        { name: "Data Siswa", href: "/dashboard/students", icon: GraduationCap },
        { name: "Data Guru", href: "/dashboard/teachers", icon: Library },
        { name: "Pengguna", href: "/dashboard/users", icon: Users },
        { name: "Pengaturan", href: "/dashboard/settings", icon: Settings }
      );
    } else if (role === "GURU") {
      menus.push(
        { name: "Jadwal Mengajar", href: "/dashboard/schedules", icon: FileText },
        { name: "Presensi Kelas", href: "/dashboard/attendance", icon: UserCheck }
      );
    } else if (role === "BENDAHARA") {
      menus.push(
        { name: "Data Pembayaran", href: "/dashboard/payments", icon: WalletCards },
        { name: "Laporan Keuangan", href: "/dashboard/financial-reports", icon: FileText }
      );
    }
    return menus;
  };

  const menus = session?.user?.role ? getRoleMenus(session.user.role) : [];

  return (
    <div className={`flex h-full w-full flex-col bg-slate-900 text-slate-300 ${className}`}>
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
            <GraduationCap className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-emerald-500 tracking-wider">SIAKAD</span>
            <span className="font-semibold text-xs text-white tracking-widest uppercase">{session?.user?.role || 'PORTAL'} PORTAL</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid gap-2 px-4 text-sm font-medium">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href || pathname?.startsWith(menu.href + '/');
            return (
              <Link
                key={index}
                href={menu.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-500" : "text-slate-400"}`} />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 rounded-xl hover:bg-slate-800 p-3 transition-colors cursor-pointer">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold border border-emerald-500/30">
            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-semibold text-slate-200 truncate max-w-30">{session?.user?.name}</span>
            <span className="text-xs text-slate-500 truncate">{session?.user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
