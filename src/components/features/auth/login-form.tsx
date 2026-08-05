"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert } from "@/lib/alert";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

interface LoginFormProps {
  variant?: "mobile" | "desktop";
}

export function LoginForm({ variant = "desktop" }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
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
      Alert.success("Login Berhasil", "Mengarahkan ke dashboard...", {
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      }).then(() => {
        router.push("/dashboard");
        router.refresh();
      });
    }
  };

  const isMobile = variant === "mobile";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`text-slate-700 font-semibold ${!isMobile ? "text-sm uppercase tracking-wider" : ""}`}>
                Email
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={isMobile ? "contoh@madrasah.sch.id" : "Masukkan alamat email..."}
                  type="email"
                  className={`${isMobile ? "h-14 rounded-2xl bg-slate-50/80" : "h-12 rounded-xl bg-slate-50"} px-4 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 ${isMobile ? "text-base" : "transition-all"}`}
                  {...field} 
                />
              </FormControl>
              <FormMessage className={isMobile ? "text-rose-500 text-xs" : "text-rose-500"} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className={`text-slate-700 font-semibold ${!isMobile ? "text-sm uppercase tracking-wider" : ""}`}>
                  Password
                </FormLabel>
                <a href="#" className={`text-sm font-medium text-emerald-600 hover:text-emerald-700 ${!isMobile ? "hover:underline" : ""}`}>
                  {isMobile ? "Lupa?" : "Lupa password?"}
                </a>
              </div>
              <FormControl>
                <Input 
                  placeholder="••••••••" 
                  type="password"
                  className={`${isMobile ? "h-14 rounded-2xl bg-slate-50/80" : "h-12 rounded-xl bg-slate-50"} px-4 border-slate-200 focus-visible:ring-emerald-500 focus-visible:ring-2 ${isMobile ? "text-base" : "transition-all"}`}
                  {...field} 
                />
              </FormControl>
              <FormMessage className={isMobile ? "text-rose-500 text-xs" : "text-rose-500"} />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className={
            isMobile 
              ? "w-full h-14 mt-4 rounded-2xl text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 active:scale-[0.98] transition-all"
              : "w-full h-12 mt-6 rounded-xl text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
          }
          disabled={loading}
        >
          {loading ? (
            isMobile ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Memproses...
              </>
            )
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </Form>
  );
}
