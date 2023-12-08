import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import dynamic from "next/dynamic";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("http://103.82.93.77:3000");
  }
 
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white p-8 rounded-md shadow-md">
      {/* Foto Profil */}
      <img
        src="/image/logo-bmkg.png"
        alt="Company Logo"
        className="w-32 h-32 rounded-full border-4 border-zinc-500 mb-4"
      />

      {/* Informasi Profil Perusahaan */}
      <div className="text-center">
        <h1 className="font-bold text-4xl mt-4">
          Sistem Informasi Pengolahan Data Sensor
        </h1>
        <h1 className="font-bold text-4xl mt-4">(BMKG)</h1>
        <p className="text-gray-600 mt-2">
          Sistem Informasi Pengolahan Data Sensor BMKG Geofisika Padang
          Panjang didesain untuk menyediakan akses terpusat dan memproses data
          sensor internal. Terintegrasi dengan website pusat dan sensor,
          memberikan tampilan data real-time. Hanya dapat diakses oleh staf
          internal setelah login. Pembaruan data terbaru memerlukan tindakan
          refresh oleh pengguna. Sistem difokuskan pada penyederhanaan akses
          dan pemrosesan data sensor, meningkatkan efisiensi dalam pemantauan
          wilayah kerja instansi.
        </p>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
