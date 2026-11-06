"use client"; // Wajib: pakai useState dan useRouter (jalan di browser)

import { useState } from "react";
import { useRouter } from "next/navigation"; // untuk pindah halaman lewat kode

export default function SearchBar() {
  const router = useRouter();
  // query = teks yang sedang diketik user
  const [query, setQuery] = useState("");

  // Dijalankan saat tombol Search ditekan atau Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // cegah reload bawaan form
    const q = query.trim(); // buang spasi di awal/akhir
    // Kalau ada teks: /peraturan?q=teks. Kalau kosong: /peraturan saja
    router.push(q ? `/peraturan?q=${encodeURIComponent(q)}` : "/peraturan");
  };

  return (
    // Kapsul putih berisi input + tombol (sesuai Figma)
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // simpan tiap huruf yang diketik
        placeholder="Search.."
        className="flex-1 bg-transparent px-4 text-sm text-black outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-[#1e2a78] px-5 py-1.5 text-sm text-white hover:bg-[#2b3a9a]"
      >
        Search
      </button>
    </form>
  );
}
