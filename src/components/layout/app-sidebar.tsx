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
    <div className={`flex h-full w-full flex-col border-r bg-white/80 backdrop-blur-xl ${className}`}>
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-blue-700 tracking-tight">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span>SIAKAD</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4 text-sm font-medium">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;
            return (
              <Link
                key={index}
                href={menu.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                    : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-slate-700 truncate max-w-30">{session?.user?.name}</span>
            <span className="text-xs text-slate-500">{session?.user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
