"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  Bell, 
  Search, 
  LogOut, 
  User, 
  Settings 
} from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Simple breadcrumb logic based on pathname
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const currentPage = pathSegments.length > 1 
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <Sheet>
        <SheetTrigger render={<Button size="icon" variant="outline" className="sm:hidden shrink-0 bg-white/50" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-70 p-0 sm:max-w-xs border-r-0">
          <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
          <SheetDescription className="sr-only">Pilih menu navigasi untuk pindah halaman.</SheetDescription>
          <AppSidebar className="border-none" />
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* Search Bar - Hidden on small screens */}
        <div className="ml-auto flex-1 sm:flex-initial relative hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Cari..."
              className="w-full rounded-full bg-slate-50 pl-8 md:w-50 lg:w-75 border-slate-200 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="ml-auto md:ml-0 rounded-full text-slate-500 hover:text-blue-600">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifikasi</span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-slate-200 shadow-sm" />}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-slate-500">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-lg">
              <User className="mr-2 h-4 w-4" />
              <span>Profil Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg">
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="cursor-pointer text-red-600 focus:bg-red-50 rounded-lg"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
