import { getAcademicYears } from "@/actions/academic-year";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Eye, Calendar, FileText, CalendarDays } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function AcademicYearsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const search = typeof params.q === 'string' ? params.q : '';
  const limit = 10;

  const { data, metadata } = await getAcademicYears(page, limit, search);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Aktif</Badge>;
      case 'selesai':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Selesai</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none">Draf</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manajemen Tahun Pelajaran</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xl">
            Kelola periode akademik, atur kalender, dan tetapkan batas waktu operasional untuk seluruh kegiatan madrasah.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Tahun Pelajaran Baru
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Left Content (3/4 on large screens) */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          
          {/* Active Period Card */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">Periode Aktif Saat Ini</h3>
                <p className="text-slate-600 text-sm">2023/2024 &mdash; Ganjil</p>
              </div>
              <Badge className="bg-emerald-100/80 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                Aktif
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Total Siswa Aktif</p>
                <p className="text-2xl font-light text-slate-800">428</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Total Kelas</p>
                <p className="text-2xl font-light text-slate-800">14</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Sisa Hari Efektif</p>
                <p className="text-2xl font-light text-slate-800"><span className="text-emerald-600 font-medium">85</span> hari</p>
              </div>
            </div>
          </div>

          {/* DataTable Section */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700 text-sm">Riwayat Periode Akademik</h3>
              <div className="w-full sm:w-64">
                <SearchInput placeholder="Cari tahun..." />
              </div>
            </div>
            
            <div className="p-4 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700 w-15 text-center rounded-tl-lg">NO</TableHead>
                    <TableHead className="font-bold text-slate-700 w-37.5">TAHUN PELAJARAN</TableHead>
                    <TableHead className="font-bold text-slate-700 w-30">SEMESTER</TableHead>
                    <TableHead className="font-bold text-slate-700 w-50">DURASI</TableHead>
                    <TableHead className="font-bold text-slate-700 w-25">STATUS</TableHead>
                    <TableHead className="font-bold text-slate-700 text-right w-20 rounded-tr-lg">AKSI</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                      Tidak ada data ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-500 text-center">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">{item.name}</TableCell>
                      <TableCell className="text-slate-600">{item.semester}</TableCell>
                      <TableCell className="text-slate-600 text-sm leading-relaxed">
                        {formatDate(item.startDate)} -<br/>{formatDate(item.endDate)}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                          {item.status.toLowerCase() === 'draf' || item.status.toLowerCase() === 'aktif' ? (
                            <Edit2 className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-400" />
                          )}
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

            {/* Pagination */}
            {metadata.totalPages > 1 && (
              <div className="p-4 border-t border-slate-100 flex items-center justify-end">
                <Pagination className="justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href={metadata.hasPrevPage ? `?page=${metadata.page - 1}${search ? `&q=${search}` : ''}` : '#'} 
                        className={!metadata.hasPrevPage ? 'pointer-events-none opacity-50' : ''} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: metadata.totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink 
                          href={`?page=${p}${search ? `&q=${search}` : ''}`}
                          isActive={p === metadata.page}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href={metadata.hasNextPage ? `?page=${metadata.page + 1}${search ? `&q=${search}` : ''}` : '#'}
                        className={!metadata.hasNextPage ? 'pointer-events-none opacity-50' : ''} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Content */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Jadwal Akademik Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Jadwal Akademik</h3>
                <p className="text-xs text-slate-500 mt-0.5">Periode 2023/2024 Ganjil</p>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 before:to-transparent pl-8">
              
              <div className="relative">
                <div className="absolute -left-8.75 top-1 bg-emerald-100 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Masa Registrasi Ulang</h4>
                <p className="text-xs text-slate-500 mt-1">01 - 15 Jul 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-8.75 top-1 bg-emerald-100 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Mulai Kegiatan Belajar</h4>
                <p className="text-xs text-slate-500 mt-1">17 Jul 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-8.75 top-1 bg-blue-100 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Ujian Tengah Semester</h4>
                <p className="text-xs text-slate-500 mt-1">18 - 25 Sep 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-8.75 top-1 bg-blue-100 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Ujian Akhir Semester</h4>
                <p className="text-xs text-slate-500 mt-1">04 - 12 Des 2023</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                Edit Jadwal Akademik
              </a>
            </div>
          </div>

          {/* Laporan Akademik Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <FileText className="w-32 h-32 text-slate-600" />
            </div>
            <div className="relative z-10">
              <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-700 mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Laporan Akademik</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Unduh rekapitulasi data akademik untuk periode aktif saat ini.
              </p>
              <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                Unduh PDF
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
