"use client"; // Wajib: komponen ini pakai useState (interaktif di browser)

import { useState } from "react";

// Props = data yang dikirim dari halaman induk ke komponen ini
type DropdownProps = {
  label: string; // tulisan di atas dropdown ("Jenis" / "Tahun")
  placeholder: string; // tulisan abu-abu sebelum user memilih
  options: string[]; // daftar pilihan
};

export default function Dropdown({
  label,
  placeholder,
  options,
}: DropdownProps) {
  // open = apakah daftar pilihan sedang terbuka
  const [open, setOpen] = useState(false);
  // selected = pilihan yang dipilih user (null = belum memilih)
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Label di atas kotak dropdown */}
      <p className="mb-1 text-xs text-white">{label}</p>

      {/* Tombol utama: klik untuk buka/tutup daftar */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md bg-[#f3eef0] px-3 py-1.5 text-left text-xs"
      >
        {/* Kalau sudah memilih tampilkan pilihan, kalau belum tampilkan placeholder */}
        <span className={selected ? "text-black" : "text-gray-400"}>
          {selected ?? placeholder}
        </span>
        <span className="text-[10px] text-black">▼</span>
      </button>

      {/* Daftar pilihan, hanya muncul kalau open = true */}
      {open && (
        <ul
          // max-h-48 = tinggi maksimal, overflow-y-auto = bisa di-scroll kalau melebihi
          className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl bg-white py-2 text-sm text-black shadow-lg"
        >
          {options.map((item) => (
            <li
              key={item} // key wajib saat membuat list di React
              onClick={() => {
                setSelected(item); // simpan pilihan
                setOpen(false); // tutup daftar
              }}
              className="cursor-pointer px-4 py-1.5 hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
