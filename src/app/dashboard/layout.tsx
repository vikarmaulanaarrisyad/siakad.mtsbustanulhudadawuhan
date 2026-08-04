"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, Users, FileText, Settings, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const getRoleMenus = (role: string) => {
    // Example menu structure based on role
    const menus = [
      { name: "Dashboard", href: `/dashboard/${role.toLowerCase()}`, icon: Home },
    ];

    if (role === "OPERATOR") {
      menus.push(
        { name: "Data Pengguna", href: "/dashboard/operator/users", icon: Users },
        { name: "Pengaturan", href: "/dashboard/operator/settings", icon: Settings }
      );
    } else if (role === "GURU") {
      menus.push(
        { name: "Jadwal Mengajar", href: "/dashboard/guru/schedules", icon: FileText }
      );
    }
    // Add other roles here...

    return menus;
  };

  const menus = session?.user?.role ? getRoleMenus(session.user.role) : [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-blue-600 text-white font-bold text-xl">
            SIAKAD MTs BH
          </div>
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const isActive = pathname === menu.href;
              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{menu.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.role}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-white shadow-sm h-16 flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-4 font-semibold text-gray-800">SIAKAD</div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
