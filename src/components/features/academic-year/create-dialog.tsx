"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAcademicYearSchema, type CreateAcademicYearInput } from "@/lib/validations/academic-year";
import { CalendarIcon, Plus, CalendarPlus, Settings2, CalendarDays, Activity } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { createAcademicYear } from "@/actions/academic-year";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";



export function CreateAcademicYearDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateAcademicYearInput>({
    resolver: zodResolver(createAcademicYearSchema),
    defaultValues: {
      name: "2024/2025",
      semester: "Ganjil",
      isActive: false,
      registrationDate: null,
      midtermDate: null,
      startDate: undefined,
      endDate: undefined,
    },
  });

  async function onSubmit(values: CreateAcademicYearInput) {
    setLoading(true);
    try {
      const res = await createAcademicYear({
        name: values.name,
        semester: values.semester,
        startDate: values.startDate.toISOString(),
        registrationDate: values.registrationDate ? values.registrationDate.toISOString() : null,
        midtermDate: values.midtermDate ? values.midtermDate.toISOString() : null,
        endDate: values.endDate.toISOString(),
        isActive: values.isActive,
      });
      if (res.success) {
        setOpen(false);
        form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Tahun pelajaran baru berhasil ditambahkan.',
          timer: 2000,
          showConfirmButton: false
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

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const start = currentYear - 1 + i;
    return `${start}/${start + 1}`;
  });

  const handleOpenModal = async () => {
    Swal.fire({
      title: "Memuat...",
      text: "Menyiapkan formulir tahun pelajaran",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulasi loading sebentar agar transisi terasa smooth
    await new Promise((resolve) => setTimeout(resolve, 600));

    Swal.close();
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Tahun Pelajaran Baru
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-130 max-h-[90vh] bg-white border-slate-200 p-0 overflow-hidden shadow-xl flex flex-col rounded-xl">
          <DialogHeader className="bg-slate-50/50 border-b border-slate-100 p-4 sm:p-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2.5 rounded-xl border border-green-200 shadow-sm">
                <CalendarPlus className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <DialogTitle className="text-slate-800 text-lg font-bold">Tambah Tahun Pelajaran</DialogTitle>
                <DialogDescription className="text-slate-500 mt-1">
                  Atur periode akademik baru, semester, beserta jadwal pelaksanaannya.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

                {/* Section 1: Informasi Umum */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings2 className="w-4 h-4 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-700">Informasi Umum</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-5 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">Tahun Ajaran</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 h-11 hover:border-slate-300 transition-colors focus:ring-green-600/20">
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
                      control={form.control}
                      name="semester"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-medium">Semester</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 h-11 hover:border-slate-300 transition-colors focus:ring-green-600/20">
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

                {/* Section 2: Jadwal Akademik */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays className="w-4 h-4 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-700">Jadwal Akademik</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
                    <FormField
                      control={form.control}
                      name="registrationDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-slate-600 font-medium">Masa Registrasi Ulang</FormLabel>
                          <Popover>
                            <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-white border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
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
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-slate-600 font-medium">Mulai Kegiatan Belajar</FormLabel>
                          <Popover>
                            <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-white border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
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
                      control={form.control}
                      name="midtermDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-slate-600 font-medium">Ujian Tengah Semester</FormLabel>
                          <Popover>
                            <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-white border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
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
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-slate-600 font-medium">Ujian Akhir Semester (UAS)</FormLabel>
                          <Popover>
                            <PopoverTrigger render={<Button variant="outline" className={cn("w-full h-11 pl-3 text-left font-normal bg-white border-slate-200 hover:border-slate-300 transition-colors focus:ring-green-600/20", !field.value && "text-muted-foreground")} />}>
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

                {/* Section 3: Pengaturan Status */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className={cn(
                      "flex flex-row items-center justify-between rounded-xl border p-5 shadow-sm transition-colors",
                      field.value ? "border-green-200 bg-green-50/50" : "border-slate-200 bg-white"
                    )}>
                      <div className="flex gap-4 items-center">
                        <div className={cn(
                          "p-2.5 rounded-lg border",
                          field.value ? "bg-green-100 border-green-200 text-green-700" : "bg-slate-100 border-slate-200 text-slate-500"
                        )}>
                          <Activity className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold text-slate-800">
                            Setel sebagai periode aktif
                          </FormLabel>
                          <FormDescription className="text-slate-500">
                            Periode ini akan menggantikan periode aktif saat ini secara otomatis.
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-600 scale-110"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div> {/* End Scrollable Content */}

              {/* Sticky Footer */}
              <div className="shrink-0 flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-slate-100 bg-white">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 px-6 text-slate-600 border-slate-200 hover:text-slate-800 hover:bg-slate-50"
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-8 bg-green-700 hover:bg-green-800 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan Periode"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
