"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/peraturan?q=${encodeURIComponent(q)}` : "/peraturan");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full max-w-2xl overflow-hidden rounded-full border border-white bg-white shadow-sm focus-within:ring-4 focus-within:ring-white/40"
    >
      <label htmlFor="cari" className="sr-only">
        Cari peraturan
      </label>
      <input
        id="cari"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari berdasarkan nomor atau judul peraturan"
        className="min-w-0 flex-1 bg-transparent px-6 py-4 text-base outline-none placeholder:text-[#7A869A]"
      />
      <button
        type="submit"
        className="m-1.5 rounded-full bg-[#1E3A8A] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2457D6]"
      >
        Cari
      </button>
    </form>
  );
}
