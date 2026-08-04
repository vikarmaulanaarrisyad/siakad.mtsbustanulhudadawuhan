"use client";

import { useSession } from "next-auth/react";

export default function OperatorDashboard() {
  const { data: session } = useSession();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Operator</h1>
      <p className="text-gray-600">
        Selamat datang, {session?.user?.name || session?.user?.email}! Anda login sebagai Operator.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-800">Total Siswa</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <h3 className="font-semibold text-green-800">Total Guru</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">45</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <h3 className="font-semibold text-purple-800">Rombel</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
        </div>
      </div>
    </div>
  );
}
