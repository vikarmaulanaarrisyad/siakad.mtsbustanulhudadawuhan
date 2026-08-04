"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home, Terminal } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Caught by error.tsx:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-red-50/50 p-8 text-center border-b border-red-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Ups! Terjadi Kesalahan Sistem
          </h1>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            Maaf, kami mengalami masalah teknis saat memproses permintaan Anda. Tim kami telah mencatat insiden ini.
          </p>
        </div>

        {/* Development Error Details */}
        {isDev && (
          <div className="p-6 bg-slate-900 border-b border-slate-800 text-left overflow-auto max-h-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Developer Mode: Local</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded">Hanya Tampil di Development</span>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 shadow-inner">
              <p className="text-red-400 font-mono text-sm font-semibold mb-2">
                {error.name}: {error.message}
              </p>
              {error.digest && (
                <p className="text-slate-500 font-mono text-xs mb-3 flex items-center gap-2">
                  <span className="text-slate-600">Digest:</span> {error.digest}
                </p>
              )}
              {error.stack && (
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">Stack Trace</span>
                  <pre className="text-slate-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-8 bg-white flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => reset()} 
            size="lg"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Coba Lagi (Muat Ulang)
          </Button>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
