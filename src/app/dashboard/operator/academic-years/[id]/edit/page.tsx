import { notFound } from "next/navigation";
import { academicYearService } from "@/services/academic-year.service";
import { EditAcademicYearForm } from "@/components/features/academic-year/edit-form";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function EditAcademicYearPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const period = await academicYearService.getPeriodById(resolvedParams.id);

  if (!period) {
    notFound();
  }

  // Determine badge color based on status
  let badgeColor = "bg-slate-100 text-slate-700";
  if (period.status === "Aktif") {
    badgeColor = "bg-green-100 text-green-700";
  } else if (period.status === "Selesai") {
    badgeColor = "bg-blue-100 text-blue-700";
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <Link href="/dashboard/operator" className="hover:text-slate-800 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Pengaturan Sistem</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-800 font-medium">Edit Tahun Pelajaran</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Edit Tahun Pelajaran</h2>
        </div>
        
        {/* Status Badge */}
        <Badge variant="secondary" className={`px-4 py-1.5 rounded-full font-medium flex items-center gap-2 ${badgeColor}`}>
          <div className={`w-2 h-2 rounded-full ${period.status === 'Aktif' ? 'bg-green-500' : period.status === 'Selesai' ? 'bg-blue-500' : 'bg-slate-400'}`} />
          {period.status === 'Aktif' ? 'Sedang Berjalan' : period.status}
        </Badge>
      </div>

      <EditAcademicYearForm initialData={period} />
    </div>
  );
}
