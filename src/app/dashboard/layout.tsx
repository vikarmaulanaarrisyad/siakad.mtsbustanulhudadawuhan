"use client";

import { useSession } from "next-auth/react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-slate-500 font-medium">Memuat SIAKAD...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Sidebar - Hidden on mobile, sticky on desktop */}
      <aside className="hidden w-65 flex-col md:flex fixed inset-y-0 z-50">
        <AppSidebar />
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-col w-full md:pl-65 min-h-screen transition-all duration-300">
        <AppHeader />
        
        <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8 overflow-x-hidden">
          {/* We wrap children in a container with max-w to ensure readability on large screens if desired */}
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
