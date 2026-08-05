"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAcademicYearSchema, type EditAcademicYearInput } from "@/lib/validations/academic-year";
import { CalendarIcon, Settings2, CalendarDays, Activity, Users, BookOpen, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { updateAcademicYear } from "@/actions/academic-year";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";



type EditFormProps = {
  initialData: {
    id: string;
    name: string;
    semester: string;
    startDate: Date;
    registrationDate: Date | null;
    midtermDate: Date | null;
    endDate: Date;
    status: string;
  };
};

export function EditAcademicYearForm({ initialData }: EditFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EditAcademicYearInput>({
    resolver: zodResolver(editAcademicYearSchema),
    defaultValues: {
      name: initialData.name,
      semester: initialData.semester,
      startDate: new Date(initialData.startDate),
      registrationDate: initialData.registrationDate ? new Date(initialData.registrationDate) : null,
      midtermDate: initialData.midtermDate ? new Date(initialData.midtermDate) : null,
      endDate: new Date(initialData.endDate),
      status: initialData.status,
      hitungHariEfektif: true,
    },
  });

  async function onSubmit(values: EditAcademicYearInput) {
    setLoading(true);
    try {
      const res = await updateAcademicYear(initialData.id, {
        name: values.name,
        semester: values.semester,
        startDate: values.startDate.toISOString(),
        registrationDate: values.registrationDate ? values.registrationDate.toISOString() : null,
        midtermDate: values.midtermDate ? values.midtermDate.toISOString() : null,
        endDate: values.endDate.toISOString(),
        status: values.status,
      });
      
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Tahun pelajaran berhasil diperbarui.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          router.push('/dashboard/operator/academic-years');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menyimpan',
          text: res.error || 'Terjadi kesalahan saat menyimpan data.',
          confirmButtonColor: '#15803d',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan Sistem',
        text: 'Terjadi kesalahan yang tidak terduga pada server.',
        confirmButtonColor: '#15803d'
      });
    } finally {
      setLoading(false);
    }
  }

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const start = 2022 + i;
    return `${start}/${start + 1}`;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informasi Periode */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="bg-green-100 p-2 rounded-lg text-green-700">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Informasi Periode</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <FormField
                control={form.control as any}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-medium">Tahun Ajaran</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50/50 border-slate-200 h-11 hover:border-slate-300 transition-colors focus:ring-green-600/20">
                          <SelectValue placeholder="Pilih tahun ajaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearOptions.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-medium">Semester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50/50 border-slate-200 h-11 hover:border-slate-300 transition-colors focus:ring-green-600/20">
                          <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ganjil">Ganjil</SelectItem>
                        <SelectItem value="Genap">Genap</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Jadwal Penting */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50/80 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-700">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Jadwal Penting</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <FormField
                control={form.control as any}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-medium">Masa Registrasi Ulang</FormLabel>
                    <Popover>
                      <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-slate-50/50 border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
                        {field.value ? format(field.value, "dd MMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-medium">Mulai Kegiatan Belajar</FormLabel>
                    <Popover>
                      <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-slate-50/50 border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
                        {field.value ? format(field.value, "dd MMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="midtermDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-medium">Ujian Tengah Semester (UTS)</FormLabel>
                    <Popover>
                      <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-slate-50/50 border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
                        {field.value ? format(field.value, "dd MMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-medium">Ujian Akhir Semester (UAS)</FormLabel>
                    <Popover>
                      <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-slate-50/50 border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
                        {field.value ? format(field.value, "dd MMM yyyy", { locale: id }) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              className="h-11 px-6 bg-green-700 hover:bg-green-800 text-white font-medium shadow-md hover:shadow-lg transition-all rounded-lg"
              disabled={loading}
            >
              <Activity className="w-4 h-4 mr-2" />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/operator/academic-years')}
              className="h-11 px-6 text-slate-600 border-slate-200 hover:text-slate-800 hover:bg-slate-50 rounded-lg"
              disabled={loading}
            >
              Batal
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Konfigurasi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                <Settings2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Konfigurasi</h3>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control as any}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-medium">Status Periode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50/50 border-slate-200 h-11 hover:border-slate-300 transition-colors focus:ring-green-600/20">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif Berjalan</SelectItem>
                        <SelectItem value="Draf">Draf</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-slate-500 mt-2">
                      Mengubah ke 'Selesai' akan mengunci semua input nilai untuk semester ini.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="hitungHariEfektif"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-semibold text-slate-800">
                        Hitung Hari Efektif
                      </FormLabel>
                      <FormDescription className="text-xs text-slate-500">
                        Otomatis hitung sisa hari KBM
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-700"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Statistik Periode */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none" />
            
            <h3 className="text-sm font-bold text-slate-400 tracking-wider mb-6 relative z-10 uppercase">
              Statistik Periode Ini
            </h3>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-full text-slate-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-slate-600 font-medium text-sm">Total Siswa Aktif</span>
                </div>
                <span className="font-semibold text-slate-800">428</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-full text-slate-500">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-slate-600 font-medium text-sm">Rombongan Belajar</span>
                </div>
                <span className="font-semibold text-slate-800">14</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-full text-slate-500">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-slate-600 font-medium text-sm">Guru Bertugas</span>
                </div>
                <span className="font-semibold text-slate-800">32</span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </Form>
  );
}
