"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function SearchInput({ placeholder = "Cari..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("q")?.toString() || "";
  const [text, setText] = useState(currentSearch);
  const [query] = useDebounce(text, 300);

  useEffect(() => {
    if (query !== currentSearch) {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      params.set("page", "1"); // Reset to page 1 on new search

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }
  }, [query, pathname, router, searchParams, currentSearch]);

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-slate-400" />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={`pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-emerald-500 rounded-lg ${isPending ? "opacity-70" : ""}`}
      />
    </div>
  );
}
