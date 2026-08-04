"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Loader2, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert } from "@/lib/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      Alert.error("Login Gagal", "Email atau password yang Anda masukkan salah.");
      setLoading(false);
    } else {
      Alert.success("Login Berhasil", "Selamat datang di SIAKAD MTs Bustanul Huda.");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:items-center md:justify-center bg-slate-900 md:p-4 overflow-hidden">
      
      {/* GLOBAL BACKGROUND (Visible primarily on desktop, top half on mobile) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-slate-900/40 md:bg-slate-900/60 backdrop-blur-[1px] md:backdrop-blur-[2px]"></div>
      </div>

      {/* =========================================
          MOBILE LAYOUT (Native App Style)
          ========================================= */}
      <div className="relative z-10 flex flex-col h-screen w-full md:hidden">
        {/* Top Section - Mobile Greeting */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-12 pb-8">
          <div className="bg-white/20 w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6 border border-white/30 shadow-lg">
            <GraduationCap size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white drop-shadow-md">
            SIAKAD
          </h1>
          <p className="text-emerald-50 text-lg font-medium drop-shadow-sm">
            MTs Bustanul Huda Dawuhan
          </p>
        </div>

        {/* Bottom Section - Mobile Bottom Sheet */}
        <div className="bg-white w-full rounded-t-[2.5rem] px-6 py-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-12 duration-700">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang!</h3>
            <p className="text-slate-500 text-sm">Masuk untuk melanjutkan aktivitas akademik.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="contoh@madrasah.sch.id" 
                        type="email"
                        className="h-14 px-4 rounded-2xl bg-slate-50/80 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700 font-semibold">Password</FormLabel>
                      <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        Lupa?
                      </a>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password"
                        className="h-14 px-4 rounded-2xl bg-slate-50/80 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 text-xs" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-14 mt-4 rounded-2xl text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 active:scale-[0.98] transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-slate-400 mt-10">
            Belum punya akun? <a href="#" className="text-emerald-600 font-semibold">Hubungi Admin</a>
          </p>
        </div>
      </div>


      {/* =========================================
          DESKTOP LAYOUT (Glassmorphism Card)
          ========================================= */}
      <div className="hidden md:flex relative z-10 w-full max-w-250 flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Side: Branding */}
        <div className="flex flex-col justify-between w-1/2 p-12 bg-linear-to-br from-emerald-600/90 to-teal-900/90 text-white">
          <div>
            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-2xl backdrop-blur-md mb-8 shadow-inner">
              <GraduationCap size={48} className="text-emerald-50" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-md">SIAKAD</h1>
            <h2 className="text-2xl font-medium text-emerald-100 mb-8">MTs Bustanul Huda Dawuhan</h2>
            <div className="w-20 h-1.5 bg-emerald-400/50 rounded-full mb-8"></div>
            <p className="text-emerald-50/90 leading-relaxed text-base max-w-sm">
              Sistem Informasi Akademik Terpadu. Kelola data siswa, guru, jadwal pelajaran, dan nilai dengan lebih mudah, cepat, dan transparan.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 text-emerald-200/80 text-sm font-medium">
            <BookOpen size={20} />
            <span>Sistem Administrasi Madrasah Modern</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 p-12 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Masuk ke Akun Anda</h3>
            <p className="text-slate-500 text-base">Silakan isi kredensial Anda untuk melanjutkan</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wider">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Masukkan alamat email..." 
                        type="email"
                        className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 transition-all"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wider">Password</FormLabel>
                      <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                        Lupa password?
                      </a>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password"
                        className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 transition-all"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 mt-6 rounded-xl text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-12 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Belum memiliki akun? {" "}
              <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Hubungi Admin Madrasah
              </a>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
