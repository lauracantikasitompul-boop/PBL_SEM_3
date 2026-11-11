/* Data peraturan (contoh). Dipakai bersama oleh homepage dan halaman detail,
   jadi setiap kartu di homepage pasti punya halaman detail yang cocok.
   Nanti file ini bisa diganti dengan pengambilan data dari database/API. */

export type Status = "Aktif" | "Diganti" | "Dicabut";

/** Jenis peraturan (urutan dipakai di dropdown navbar) */
export const jenisPeraturan = [
  "Kebutuhan Eksternal",
  "Kebutuhan Internal",
  "Pedoman Internal",
  "Pedoman Bisnis",
] as const;

export type Urutan = "terbaru" | "terlama" | "terpopuler";

export type Hubungan = {
  label: string; // contoh: "Diganti oleh", "Menggantikan", "Mencabut"
  items: { judul: string; slug?: string }[];
};

export type Peraturan = {
  slug: string; // dipakai di alamat: /peraturan/<slug>
  nomor: string;
  tentang: string;
  subjek: string;
  kategori: string;
  tanggalDitetapkan: string; // format ISO: YYYY-MM-DD
  status: Status;
  abstrak: string;
  views: number;
  downloads: number;
  file: { nama: string; url: string };
  riwayat: Hubungan[];
};

export const daftarPeraturan: Peraturan[] = [
  {
    slug: "nomor-08-tahun-2026",
    nomor: "08",
    tentang: "Pedoman Retensi dan Penyusutan Arsip",
    subjek: "Kearsipan",
    kategori: "Pedoman Internal",
    tanggalDitetapkan: "2026-10-20",
    status: "Aktif",
    abstrak:
      "Peraturan ini mengatur jangka waktu penyimpanan (retensi) arsip dan tata cara penyusutannya, mulai dari pemindahan, pemusnahan, hingga penyerahan arsip statis.",
    views: 81,
    downloads: 40,
    file: {
      nama: "Peraturan Direktur Nomor 08 Tahun 2026.pdf",
      url: "/files/peraturan-direktur-08-2026.pdf",
    },
    riwayat: [
      {
        label: "Menggantikan",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 05 Tahun 2024 tentang Pedoman Pengelolaan Arsip Dinamis",
            slug: "nomor-05-tahun-2024",
          },
        ],
      },
    ],
  },
  {
    slug: "nomor-07-tahun-2026",
    nomor: "07",
    tentang: "Pedoman Pengelolaan Arsip Dinamis Elektronik",
    subjek: "Kearsipan",
    kategori: "Pedoman Internal",
    tanggalDitetapkan: "2026-10-20",
    status: "Aktif",
    abstrak:
      "Peraturan ini mengatur pengelolaan arsip dinamis dalam bentuk elektronik, termasuk format berkas, penyimpanan, keamanan, dan alih media dari arsip konvensional.",
    views: 75,
    downloads: 33,
    file: {
      nama: "Peraturan Direktur Nomor 07 Tahun 2026.pdf",
      url: "/files/peraturan-direktur-07-2026.pdf",
    },
    riwayat: [
      {
        label: "Menggantikan",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 05 Tahun 2024 tentang Pedoman Pengelolaan Arsip Dinamis",
            slug: "nomor-05-tahun-2024",
          },
        ],
      },
    ],
  },
  {
    slug: "nomor-06-tahun-2026",
    nomor: "06",
    tentang: "Standar Pelayanan kepada Mitra dan Pihak Eksternal",
    subjek: "Pelayanan",
    kategori: "Kebutuhan Eksternal",
    tanggalDitetapkan: "2026-10-12",
    status: "Aktif",
    abstrak:
      "Peraturan ini menetapkan standar pelayanan kepada mitra dan pihak eksternal, meliputi waktu respons, jalur komunikasi, dan penanganan keluhan.",
    views: 99,
    downloads: 52,
    file: {
      nama: "Peraturan Direktur Nomor 06 Tahun 2026.pdf",
      url: "/files/peraturan-direktur-06-2026.pdf",
    },
    riwayat: [],
  },
  {
    slug: "nomor-05-tahun-2024",
    nomor: "05",
    tentang: "Pedoman Pengelolaan Arsip Dinamis",
    subjek: "Kearsipan",
    kategori: "Pedoman Internal",
    tanggalDitetapkan: "2024-03-06",
    status: "Diganti",
    abstrak:
      "Peraturan ini mengatur tata cara pengelolaan arsip dinamis di lingkungan kerja, mencakup penciptaan, penggunaan, pemeliharaan, dan penyusutan arsip. Peraturan ini juga menetapkan tanggung jawab unit kerja dalam menjaga keutuhan dan keamanan arsip.",
    views: 412,
    downloads: 230,
    file: {
      nama: "Peraturan Direktur Nomor 05 Tahun 2024.pdf",
      url: "/files/peraturan-direktur-05-2024.pdf",
    },
    riwayat: [
      {
        label: "Diganti oleh",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 07 Tahun 2026 tentang Pedoman Pengelolaan Arsip Dinamis Elektronik",
            slug: "nomor-07-tahun-2026",
          },
          {
            judul:
              "Peraturan Direktur Nomor 08 Tahun 2026 tentang Pedoman Retensi dan Penyusutan Arsip",
            slug: "nomor-08-tahun-2026",
          },
        ],
      },
      {
        label: "Mencabut",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 03 Tahun 2021 tentang Tata Kelola Arsip",
          },
        ],
      },
    ],
  },
  {
    slug: "nomor-01-tahun-2025",
    nomor: "01",
    tentang: "Pedoman Pengadaan Barang dan Jasa",
    subjek: "Pengadaan",
    kategori: "Pedoman Bisnis",
    tanggalDitetapkan: "2025-01-14",
    status: "Aktif",
    abstrak:
      "Peraturan ini mengatur prinsip, tahapan, dan kewenangan dalam pengadaan barang dan jasa, termasuk batas nilai dan mekanisme persetujuan.",
    views: 356,
    downloads: 190,
    file: {
      nama: "Peraturan Direktur Nomor 01 Tahun 2025.pdf",
      url: "/files/peraturan-direktur-01-2025.pdf",
    },
    riwayat: [],
  },
  {
    slug: "nomor-02-tahun-2023",
    nomor: "02",
    tentang: "Ketentuan Jam Kerja dan Presensi Pegawai",
    subjek: "Kepegawaian",
    kategori: "Kebutuhan Internal",
    tanggalDitetapkan: "2023-01-02",
    status: "Dicabut",
    abstrak:
      "Peraturan ini mengatur jam kerja, tata cara presensi, dan sanksi keterlambatan bagi pegawai.",
    views: 298,
    downloads: 120,
    file: {
      nama: "Peraturan Direktur Nomor 02 Tahun 2023.pdf",
      url: "/files/peraturan-direktur-02-2023.pdf",
    },
    riwayat: [
      {
        label: "Dicabut oleh",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 04 Tahun 2025 tentang Pengaturan Waktu Kerja Pegawai",
            slug: "nomor-04-tahun-2025",
          },
        ],
      },
    ],
  },
  {
    slug: "nomor-04-tahun-2025",
    nomor: "04",
    tentang: "Pengaturan Waktu Kerja Pegawai",
    subjek: "Kepegawaian",
    kategori: "Kebutuhan Internal",
    tanggalDitetapkan: "2025-02-17",
    status: "Aktif",
    abstrak:
      "Peraturan ini mengatur waktu kerja, presensi, dan fleksibilitas jam kerja pegawai, serta mencabut ketentuan jam kerja yang lama.",
    views: 120,
    downloads: 61,
    file: {
      nama: "Peraturan Direktur Nomor 04 Tahun 2025.pdf",
      url: "/files/peraturan-direktur-04-2025.pdf",
    },
    riwayat: [
      {
        label: "Mencabut",
        items: [
          {
            judul:
              "Peraturan Direktur Nomor 02 Tahun 2023 tentang Ketentuan Jam Kerja dan Presensi Pegawai",
            slug: "nomor-02-tahun-2023",
          },
        ],
      },
    ],
  },
  {
    slug: "nomor-03-tahun-2026",
    nomor: "03",
    tentang: "Pedoman Manajemen Risiko",
    subjek: "Manajemen Risiko",
    kategori: "Pedoman Bisnis",
    tanggalDitetapkan: "2026-09-15",
    status: "Aktif",
    abstrak:
      "Peraturan ini menetapkan kerangka identifikasi, penilaian, dan penanganan risiko pada proses bisnis.",
    views: 64,
    downloads: 28,
    file: {
      nama: "Peraturan Direktur Nomor 03 Tahun 2026.pdf",
      url: "/files/peraturan-direktur-03-2026.pdf",
    },
    riwayat: [],
  },
  {
    slug: "nomor-02-tahun-2025",
    nomor: "02",
    tentang: "Tata Cara Kerja Sama dengan Pihak Ketiga",
    subjek: "Kerja Sama",
    kategori: "Kebutuhan Eksternal",
    tanggalDitetapkan: "2025-03-10",
    status: "Aktif",
    abstrak:
      "Peraturan ini mengatur tahapan penjajakan, penyusunan naskah, dan persetujuan kerja sama dengan pihak ketiga.",
    views: 88,
    downloads: 41,
    file: {
      nama: "Peraturan Direktur Nomor 02 Tahun 2025.pdf",
      url: "/files/peraturan-direktur-02-2025.pdf",
    },
    riwayat: [],
  },
];

/* ---------- Fungsi bantu ---------- */

export function getPeraturan(slug: string): Peraturan | undefined {
  return daftarPeraturan.find((p) => p.slug === slug);
}

export function tahunPeraturan(p: Peraturan): string {
  return p.tanggalDitetapkan.slice(0, 4);
}

/** Contoh: "Nomor 08 Tahun 2026" */
export function labelNomorTahun(p: Peraturan): string {
  return `Nomor ${p.nomor} Tahun ${tahunPeraturan(p)}`;
}

/** Contoh: "Peraturan Direktur Nomor 08 Tahun 2026" */
export function judulLengkap(p: Peraturan): string {
  return `Peraturan Direktur ${labelNomorTahun(p)}`;
}

/** "long" -> 20 Oktober 2026, "short" -> 20 Okt 2026 */
export function formatTanggal(
  iso: string,
  bulan: "long" | "short" = "long",
): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: bulan,
    year: "numeric",
    timeZone: "UTC",
  });
}

/** 3 peraturan dengan tanggal terbaru */
export function peraturanTerbaru(jumlah = 3): Peraturan[] {
  return [...daftarPeraturan]
    .sort(
      (a, b) =>
        b.tanggalDitetapkan.localeCompare(a.tanggalDitetapkan) ||
        b.nomor.localeCompare(a.nomor),
    )
    .slice(0, jumlah);
}

/** 3 peraturan dengan jumlah dilihat terbanyak */
export function peraturanTerpopuler(jumlah = 3): Peraturan[] {
  return [...daftarPeraturan].sort((a, b) => b.views - a.views).slice(0, jumlah);
}

/** Pencarian + penyaringan jenis/tahun + pengurutan untuk halaman daftar */
export function cariPeraturan({
  q = "",
  jenis = "",
  tahun = "",
  urut = "terbaru",
}: {
  q?: string;
  jenis?: string;
  tahun?: string;
  urut?: Urutan;
}): Peraturan[] {
  const kata = q.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const hasil = daftarPeraturan.filter((p) => {
    if (jenis && p.kategori !== jenis) return false;
    if (tahun && tahunPeraturan(p) !== tahun) return false;
    if (kata.length === 0) return true;

    const teks = [
      judulLengkap(p),
      p.tentang,
      p.subjek,
      p.kategori,
      p.abstrak,
    ]
      .join(" ")
      .toLowerCase();

    return kata.every((k) => teks.includes(k));
  });

  const urutTanggal = (a: Peraturan, b: Peraturan) =>
    a.tanggalDitetapkan.localeCompare(b.tanggalDitetapkan) ||
    a.nomor.localeCompare(b.nomor);

  if (urut === "terlama") return hasil.sort(urutTanggal);
  if (urut === "terpopuler") return hasil.sort((a, b) => b.views - a.views);
  return hasil.sort((a, b) => urutTanggal(b, a));
}