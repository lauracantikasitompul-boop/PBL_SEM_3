// Tipe data dan fungsi penyimpanan notifikasi yang dipakai bersama
// oleh Dashboard (menulis) dan Home (membaca).

export type Status = "Berlaku" | "Cabut" | "Ganti";

export type Notifikasi = {
  id: number;
  judul: string;
  tipe: string;
  tanggal: string; // format dari input tanggal: yyyy-mm-dd
  status: Status;
};

// Nama "laci" di localStorage tempat data disimpan
const KUNCI = "mapena-notifikasi";

// Membaca daftar dari localStorage. Mengembalikan null kalau belum ada isinya.
export function bacaNotifikasi(): Notifikasi[] | null {
  try {
    const mentah = localStorage.getItem(KUNCI);
    return mentah ? (JSON.parse(mentah) as Notifikasi[]) : null;
  } catch {
    return null; // misal data rusak atau localStorage tidak tersedia
  }
}

// Menyimpan daftar ke localStorage (diubah dulu jadi teks lewat JSON)
export function simpanNotifikasi(data: Notifikasi[]) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(data));
  } catch {
    // diabaikan kalau penyimpanan penuh atau diblokir
  }
}
