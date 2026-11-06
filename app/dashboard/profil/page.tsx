"use client"; // Wajib: halaman ini interaktif (pakai useState)

import { useState } from "react";
import TopBar from "../../components/TopBar";

// Bentuk data profil
type Profil = {
  nama: string;
  username: string;
  peran: string;
};

// Data awal SEMENTARA (contoh). Nanti diambil dari akun yang sedang login.
const profilAwal: Profil = {
  nama: "Administrator",
  username: "admin",
  peran: "Admin MAPENA",
};

// Gaya kolom isian, dipakai berulang
const gayaInput =
  "w-full rounded-md bg-white px-3 py-1.5 text-sm text-black outline-none";

export default function ProfilPage() {
  // profil = data yang sudah TERSIMPAN (yang tampil di kartu)
  const [profil, setProfil] = useState<Profil>(profilAwal);
  // mengedit = apakah sedang mode edit (true) atau mode lihat (false)
  const [mengedit, setMengedit] = useState(false);
  // Isian sementara selagi mengedit. Terpisah dari profil supaya
  // kalau dibatalkan, data asli tidak ikut berubah.
  const [namaBaru, setNamaBaru] = useState(profil.nama);
  const [usernameBaru, setUsernameBaru] = useState(profil.username);
  const [pesan, setPesan] = useState(""); // pesan kalau isian kosong

  // Masuk mode edit: isi kolom dengan data saat ini
  const mulaiEdit = () => {
    setNamaBaru(profil.nama);
    setUsernameBaru(profil.username);
    setPesan("");
    setMengedit(true);
  };

  // Batal: keluar dari mode edit tanpa menyimpan apa pun
  const batal = () => {
    setMengedit(false);
    setPesan("");
  };

  // Simpan: cek dulu isiannya tidak kosong, lalu perbarui profil
  const simpan = () => {
    if (!namaBaru.trim() || !usernameBaru.trim()) {
      setPesan("Nama dan username tidak boleh kosong.");
      return;
    }
    setProfil({
      ...profil,
      nama: namaBaru.trim(),
      username: usernameBaru.trim(),
    });
    setMengedit(false);
    setPesan("");
  };

  return (
    <main className="flex-1 p-4">
      {/* Tombol kembali di halaman ini mengarah ke Dashboard */}
      <TopBar judul="Profil" kembaliKe="/dashboard" />

      <section className="mx-auto mt-6 max-w-md rounded-3xl bg-white/60 p-6 backdrop-blur-sm">
        {/* Avatar: lingkaran dengan ikon orang */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#4a4e75] text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-14 w-14"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
            </svg>
          </div>
        </div>

        <h2 className="mt-3 text-center text-lg text-black">{profil.nama}</h2>

        {/* Tampilan bergantung pada mode: lihat atau edit */}
        {!mengedit ? (
          <>
            {/* MODE LIHAT: daftar informasi + tombol Edit Profil */}
            <div className="mt-4 space-y-2 text-sm text-black">
              <div className="flex justify-between border-b border-white pb-2">
                <span>Nama</span>
                <span>{profil.nama}</span>
              </div>
              <div className="flex justify-between border-b border-white pb-2">
                <span>Username</span>
                <span>{profil.username}</span>
              </div>
              <div className="flex justify-between border-b border-white pb-2">
                <span>Peran</span>
                <span>{profil.peran}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={mulaiEdit}
              className="mt-5 w-full rounded-full bg-[#1e2a78] py-2 text-sm text-white hover:bg-[#2b3a9a]"
            >
              Edit Profil
            </button>
          </>
        ) : (
          /* MODE EDIT: form isian. onSubmit membuat tombol Enter juga menyimpan */
          <form
            onSubmit={(e) => {
              e.preventDefault(); // cegah reload bawaan form
              simpan();
            }}
            className="mt-4 space-y-3"
          >
            <div>
              <label htmlFor="nama" className="mb-1 block text-xs text-black">
                Nama
              </label>
              <input
                id="nama"
                type="text"
                value={namaBaru}
                onChange={(e) => setNamaBaru(e.target.value)} // simpan tiap huruf yang diketik
                className={gayaInput}
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-xs text-black"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={usernameBaru}
                onChange={(e) => setUsernameBaru(e.target.value)}
                className={gayaInput}
              />
            </div>

            {/* Peran hanya ditampilkan, tidak bisa diubah */}
            <div className="flex justify-between text-sm text-black">
              <span>Peran</span>
              <span>{profil.peran}</span>
            </div>

            {/* Pesan kesalahan, hanya muncul kalau isian kosong */}
            {pesan && <p className="text-xs text-red-700">{pesan}</p>}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={batal}
                className="flex-1 rounded-full bg-white py-2 text-sm text-black hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-[#1e2a78] py-2 text-sm text-white hover:bg-[#2b3a9a]"
              >
                Simpan
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
