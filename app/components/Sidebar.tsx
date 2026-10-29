"use client"; // Wajib: pakai usePathname (hook yang jalan di browser)

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Daftar menu sidebar. Mau tambah menu? Cukup tambah satu baris di sini.
const menu = [
  { nama: "Dashboard", href: "/dashboard" },
  { nama: "Kebijakan Eksternal", href: "/dashboard/kebijakan-eksternal" },
  { nama: "Kebijakan Internal", href: "/dashboard/kebijakan-internal" },
  { nama: "Pedoman Internal", href: "/dashboard/pedoman-internal" },
  { nama: "Proses Bisnis", href: "/dashboard/proses-bisnis" },
];

export default function Sidebar() {
  // pathname = alamat halaman yang sedang dibuka, untuk menandai menu aktif
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col bg-gray-600/50 backdrop-blur-md">
      {/* Logo MAPENA + garis putih di bawahnya */}
      <div className="flex justify-center border-b border-white py-4">
        <Image
          src="/logo-mapena.png"
          alt="Logo MAPENA"
          width={110}
          height={110}
        />
      </div>

      {/* Daftar menu: map() = ulangi untuk tiap item di array */}
      <nav className="mt-2 flex-1">
        {menu.map((item) => {
          const aktif = pathname === item.href; // true kalau menu ini sedang dibuka
          return (
            <Link
              key={item.href} // key wajib saat membuat list di React
              href={item.href}
              // Menu aktif: latar terang + teks gelap. Lainnya: teks putih
              className={`block px-6 py-3 text-center text-lg ${
                aktif
                  ? "bg-gray-200/90 text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.nama}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Logout di bawah, garis putih di atasnya */}
      <div className="border-t border-white py-4 text-center">
        <Link
          href="/login" // logout = kembali ke halaman Login
          className="rounded-xl bg-gray-200 px-8 py-1.5 text-lg text-black hover:bg-white"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}
