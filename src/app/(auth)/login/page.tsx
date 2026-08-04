"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Pane - Branding/Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600 via-teal-700 to-slate-900 opacity-90 z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl z-0" />
        <div className="absolute bottom-12 right-12 w-72 h-72 rounded-full bg-teal-400/20 blur-3xl z-0" />
        
        <div className="relative z-20 flex flex-col justify-center items-center w-full h-full p-12 text-white">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 mb-8 shadow-2xl">
            <GraduationCap size={80} strokeWidth={1.5} className="text-emerald-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight mb-4 drop-shadow-md">
            SIAKAD
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-100 mb-6 drop-shadow-sm text-center">
            MTs Bustanul Huda Dawuhan
          </h2>
          <p className="text-slate-300 text-center max-w-md text-lg leading-relaxed">
            Sistem Informasi Akademik Terpadu untuk kemudahan administrasi, pemantauan nilai, dan manajemen madrasah yang lebih baik.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center lg:hidden mb-8">
            <div className="bg-emerald-100 p-3 rounded-xl mb-4 text-emerald-700 shadow-sm">
              <GraduationCap size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">SIAKAD</h2>
            <p className="text-sm font-medium text-slate-500">MTs Bustanul Huda Dawuhan</p>
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/50 sm:border sm:border-slate-100">
            <CardHeader className="space-y-1 pb-8 text-center sm:text-left">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Selamat Datang Kembali
              </CardTitle>
              <CardDescription className="text-slate-500 text-base">
                Masukkan email dan password untuk mengakses akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Alamat Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="contoh@madrasah.sch.id" 
                              type="email"
                              className="h-11 bg-slate-50 border-slate-200 transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                            <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 hover:underline transition-all">
                              Lupa password?
                            </a>
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type="password"
                              className="h-11 bg-slate-50 border-slate-200 transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Masuk ke Dashboard"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500">
                Belum memiliki akun? {" "}
                <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all">
                  Hubungi Operator
                </a>
              </p>
            </CardFooter>
          </Card>
          
          <p className="text-center text-xs text-slate-400 mt-8">
            &copy; {new Date().getFullYear()} MTs Bustanul Huda Dawuhan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
