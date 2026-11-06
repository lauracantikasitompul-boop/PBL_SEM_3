"use client"; // Wajib: halaman ini interaktif (pakai useState dan useEffect)

import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import {
  bacaNotifikasi,
  simpanNotifikasi,
  type Notifikasi,
  type Status,
} from "../lib/notifikasi";

// Kartu statistik (angka dummy dari Figma, nanti dari database)
const statistik = [
  { judul: "Kebijakan Eksternal", jumlah: 13 },
  { judul: "Kebijakan Internal", jumlah: 15 },
  { judul: "Pedoman Internal", jumlah: 15 },
  { judul: "Proses Bisnis", jumlah: 38 },
];

// Pilihan untuk dropdown di form
const daftarTipe = [
  "Kebijakan Eksternal",
  "Kebijakan Internal",
  "Pedoman Internal",
  "Proses Bisnis",
];
const daftarStatus: Status[] = ["Berlaku", "Cabut", "Ganti"];

// Data awal tabel (dummy). Dipakai kalau belum ada data tersimpan.
const dataAwal: Notifikasi[] = [
  { id: 5, judul: "", tipe: "", tanggal: "", status: "Berlaku" },
  { id: 4, judul: "", tipe: "", tanggal: "", status: "Cabut" },
  { id: 3, judul: "", tipe: "", tanggal: "", status: "Berlaku" },
  { id: 2, judul: "", tipe: "", tanggal: "", status: "Ganti" },
  { id: 1, judul: "", tipe: "", tanggal: "", status: "Cabut" },
];

// Warna badge tiap status
const warnaStatus: Record<Status, string> = {
  Berlaku: "bg-green-500 text-white",
  Cabut: "bg-gray-400 text-black",
  Ganti: "bg-sky-300 text-black",
};

// Pembagian kolom, dipakai di header DAN baris supaya sejajar
const kolom =
  "grid grid-cols-[3rem_1fr_1fr_1fr_6rem_5rem] items-center gap-2 px-4";

// Ubah "2026-10-30" menjadi "30/10/2026"
function formatTanggal(t: string) {
  if (!t) return "";
  const [tahun, bulan, hari] = t.split("-");
  return `${hari}/${bulan}/${tahun}`;
}

// Gaya input yang dipakai berulang di form
const gayaInput =
  "w-full rounded-md bg-white px-2 py-1 text-xs text-black outline-none";

export default function DashboardPage() {
  // Daftar notifikasi di tabel kiri
  const [notifikasi, setNotifikasi] = useState<Notifikasi[]>(dataAwal);

  // Isi form di panel kanan (disimpan selagi diketik)
  const [judul, setJudul] = useState("");
  const [tipe, setTipe] = useState(daftarTipe[0]);
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState<Status>("Berlaku");
  const [pesan, setPesan] = useState(""); // pesan kalau form belum lengkap

  // Saat halaman pertama dibuka: kalau sudah ada data tersimpan, pakai itu.
  // useEffect dengan [] = dijalankan sekali, setelah halaman tampil di browser.
  useEffect(() => {
    const tersimpan = bacaNotifikasi();
    if (tersimpan) setNotifikasi(tersimpan);
  }, []);

  // Memperbarui tampilan SEKALIGUS menyimpannya ke localStorage
  const perbarui = (daftar: Notifikasi[]) => {
    setNotifikasi(daftar);
    simpanNotifikasi(daftar);
  };

  // Dijalankan saat tombol Tambah ditekan
  const tambah = () => {
    // Validasi: judul dan tanggal wajib diisi
    if (!judul.trim() || !tanggal) {
      setPesan("Judul dan tanggal wajib diisi.");
      return;
    }
    const baru: Notifikasi = {
      id: Date.now(), // angka unik dari waktu sekarang
      judul: judul.trim(),
      tipe,
      tanggal,
      status,
    };
    perbarui([baru, ...notifikasi]); // taruh paling atas + simpan
    // Kosongkan form lagi
    setJudul("");
    setTanggal("");
    setPesan("");
  };

  // Hapus satu notifikasi berdasarkan id
  const hapus = (id: number) => {
    perbarui(notifikasi.filter((n) => n.id !== id));
  };

  // Mengosongkan semua isian form dan mengembalikan pilihan ke awal.
  // Dipakai tombol "Hapus" kalau batal membuat notifikasi.
  const kosongkanForm = () => {
    setJudul("");
    setTipe(daftarTipe[0]); // kembali ke pilihan pertama
    setTanggal("");
    setStatus("Berlaku");
    setPesan(""); // hilangkan pesan merah kalau ada
  };

  return (
    // min-w-0 = konten boleh mengecil mengikuti lebar layar (tidak terpotong)
    <main className="min-w-0 flex-1 p-4">
      <TopBar judul="Dashboard" />

      {/* KARTU STATISTIK */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statistik.map((s) => (
          <div key={s.judul} className="rounded-3xl bg-white p-3">
            <p className="text-xs text-black">{s.judul}</p>
            <p className="mt-3 text-right text-sm text-black">{s.jumlah}</p>
          </div>
        ))}
      </div>

      {/* DUA PANEL BERSEBELAHAN.
          xl:grid-cols-[1fr_20rem] = di layar besar: kiri selebar sisa ruang (1fr),
          kanan tetap 20rem. Di layar kecil otomatis tersusun atas-bawah.
          items-start = tinggi tiap panel mengikuti isinya sendiri. */}
      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[1fr_20rem]">
        {/* PANEL KIRI: TABEL NOTIFIKASI */}
        <section className="min-w-0 rounded-3xl bg-white/60 p-4 backdrop-blur-sm">
          <h2 className="text-lg text-black">Notifikasi</h2>

          {/* Header tabel */}
          <div
            className={`${kolom} mt-1 rounded-full bg-[#4a4e75] py-2 text-xs text-white`}
          >
            <span>No</span>
            <span>Judul Peraturan</span>
            <span>Tipe</span>
            <span>Tanggal Berlaku</span>
            <span className="text-center">Status</span>
            <span className="text-center">Aksi</span>
          </div>

          {/* Baris data. max-h + overflow-y-auto = bisa di-scroll kalau banyak */}
          <div className="max-h-96 overflow-y-auto">
            {notifikasi.length === 0 && (
              <p className="py-4 text-center text-xs text-black">
                Belum ada notifikasi.
              </p>
            )}

            {notifikasi.map((n, i) => (
              <div
                key={n.id}
                className={`${kolom} border-b border-white py-3 text-xs text-black`}
              >
                {/* Nomor dihitung otomatis: yang paling atas = nomor terbesar */}
                <span>{notifikasi.length - i}</span>
                <span>{n.judul}</span>
                <span>{n.tipe}</span>
                <span>{formatTanggal(n.tanggal)}</span>

                <span className="text-center">
                  <span
                    className={`rounded-full px-3 py-0.5 ${warnaStatus[n.status]}`}
                  >
                    {n.status}
                  </span>
                </span>

                {/* Ikon aksi: edit (belum ada fungsi) dan hapus (sudah jalan) */}
                <span className="flex justify-center gap-2">
                  <button aria-label="Edit">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button aria-label="Hapus" onClick={() => hapus(n.id)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PANEL KANAN: BUAT NOTIFIKASI (isian berderet ke bawah) */}
        <section className="rounded-3xl bg-white/60 p-4 backdrop-blur-sm">
          <h2 className="text-lg text-black">Buat Notifikasi</h2>

          {/* Judul panel berbentuk bar, sama seperti header tabel */}
          <div className="mt-1 rounded-full bg-[#4a4e75] px-4 py-2 text-xs text-white">
            Isi data peraturan
          </div>

          {/* space-y-3 = jarak antar isian */}
          <div className="mt-3 space-y-3 px-1">
            <div>
              <label htmlFor="judul" className="mb-1 block text-xs text-black">
                Judul Peraturan
              </label>
              <input
                id="judul"
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)} // simpan tiap huruf yang diketik
                placeholder="Judul peraturan"
                className={gayaInput}
              />
            </div>

            <div>
              <label htmlFor="tipe" className="mb-1 block text-xs text-black">
                Tipe
              </label>
              <select
                id="tipe"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className={gayaInput}
              >
                {daftarTipe.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="tanggal"
                className="mb-1 block text-xs text-black"
              >
                Tanggal Berlaku
              </label>
              <input
                id="tanggal"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className={gayaInput}
              />
            </div>

            <div>
              <label htmlFor="status" className="mb-1 block text-xs text-black">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className={gayaInput}
              >
                {daftarStatus.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Pesan kesalahan, hanya muncul kalau form belum lengkap */}
            {pesan && <p className="text-xs text-red-700">{pesan}</p>}

            {/* Dua tombol berdampingan. flex + gap-2 = sejajar dengan jarak,
                flex-1 = masing-masing selebar sama */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={kosongkanForm}
                className="flex-1 rounded-full bg-white py-2 text-xs text-black hover:bg-gray-200"
              >
                Hapus
              </button>
              <button
                type="button"
                onClick={tambah}
                className="flex-1 rounded-full bg-[#1e2a78] py-2 text-xs text-white hover:bg-[#2b3a9a]"
              >
                Tambah
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
