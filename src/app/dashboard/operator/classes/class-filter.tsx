"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ClassFilter({ academicYears, currentYear }: { academicYears: any[], currentYear: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== 'all') {
      params.set('year', value);
    } else {
      params.delete('year');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={currentYear} onValueChange={handleValueChange}>
      <SelectTrigger className="w-48 bg-slate-100/50 border-none rounded-full h-9 font-medium text-slate-700 shadow-none">
        <SelectValue placeholder="Semua Tahun" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Tahun</SelectItem>
        {academicYears.map((year) => (
          <SelectItem key={year.id} value={year.id}>
            {year.name} - {year.semester}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
