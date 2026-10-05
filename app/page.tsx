import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const APP_NAME = "Peraturan";

type Status = "Berlaku" | "Dicabut" | "Diganti";

const statusStyle: Record<Status, { bar: string; badge: string }> = {
  Berlaku: { bar: "border-l-[#0F766E]", badge: "bg-[#E3F3F1] text-[#0B5A54]" },
  Dicabut: { bar: "border-l-[#B42318]", badge: "bg-[#FCE8E6] text-[#8A1A11]" },
  Diganti: { bar: "border-l-[#B45309]", badge: "bg-[#FBEFD9] text-[#8A3F06]" },
};

// TODO: ganti dengan data dari API / database
const pemberitahuan: {
  id: number;
  status: Status;
  nomor: string;
  judul: string;
  tanggal: string;
}[] = [
  {
    id: 1,
    status: "Dicabut",
    nomor: "Perdir No. 12 Tahun 2022",
    judul: "Pedoman Penggunaan Fasilitas Laboratorium",
    tanggal: "3 Okt 2026",
  },
  {
    id: 2,
    status: "Diganti",
    nomor: "Perdir No. 07 Tahun 2021",
    judul: "Tata Cara Pengajuan Cuti Pegawai",
    tanggal: "1 Okt 2026",
  },
  {
    id: 3,
    status: "Berlaku",
    nomor: "Perdir No. 03 Tahun 2026",
    judul: "Standar Pelayanan Administrasi Akademik",
    tanggal: "28 Sep 2026",
  },
  {
    id: 4,
    status: "Dicabut",
    nomor: "Perdir No. 19 Tahun 2020",
    judul: "Ketentuan Peminjaman Aset Kampus",
    tanggal: "24 Sep 2026",
  },
];

const jenisPeraturan = [
  { slug: "peraturan-direktur", nama: "Peraturan Direktur", jumlah: 48 },
  { slug: "keputusan-direktur", nama: "Keputusan Direktur", jumlah: 63 },
  { slug: "surat-edaran", nama: "Surat Edaran", jumlah: 27 },
  { slug: "pedoman-sop", nama: "Pedoman & SOP", jumlah: 35 },
];

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/peraturan", label: "Daftar Peraturan" },
  { href: "/login", label: "Masuk Admin" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="border-b border-[#BFDBFE] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#388bdd]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#40afd4] text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M7 3h7l4 4v14H7z" />
                <path d="M14 3v4h4M10 12h5M10 16h5" />
              </svg>
            </span>
            <span className="text-lg font-semibold [font-family:var(--font-serif)]">
              {APP_NAME}
            </span>
          </Link>

          <nav aria-label="Navigasi utama">
            <ul className="flex items-center gap-1 text-sm font-medium">
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={
                      i === navLinks.length - 1
                        ? "ml-2 rounded-full border border-[#2a86cd] px-4 py-2 text-[#2e70c6] transition-colors hover:bg-[#1e6baf] hover:text-white"
                        : "rounded-full px-3 py-2 text-[#41506B] transition-colors hover:bg-[#EFF6FF] hover:text-[#14213D]"
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero + pencarian */}
        <section className="bg-[#1e83af]">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-16 text-center sm:py-24">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl [font-family:var(--font-serif)]">
              Selamat datang di {APP_NAME}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#DBEAFE]">
              Temukan peraturan direktur, lihat riwayat perubahannya, dan
              pastikan yang Anda baca masih berlaku.
            </p>

            <div className="mt-9 flex w-full justify-center">
              <SearchBar />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-[#DBEAFE]">
              <span>Filter cepat:</span>
              {(Object.keys(statusStyle) as Status[]).map((s) => (
                <Link
                  key={s}
                  href={`/peraturan?status=${s.toLowerCase()}`}
                  className="rounded-full bg-white px-3 py-1 font-medium text-[#1E3A8A] hover:bg-[#DBEAFE]"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pemberitahuan + Jenis Peraturan */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold [font-family:var(--font-serif)]">
                Pemberitahuan
              </h2>
              <Link
                href="/pemberitahuan"
                className="text-sm font-medium text-[#1D4ED8] hover:underline"
              >
                Lihat semua
              </Link>
            </div>
            <ul className="space-y-3">
              {pemberitahuan.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/peraturan/${p.id}`}
                    className={`block rounded-lg border border-[#BFDBFE] border-l-4 bg-white p-4 transition-colors hover:border-[#93C5FD] hover:border-l-4 ${statusStyle[p.status].bar} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2457D6]`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-[#5B6A85]">{p.nomor}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[p.status].badge}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-1.5 font-medium">{p.judul}</p>
                    <p className="mt-1 text-sm text-[#7A869A]">{p.tanggal}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-semibold [font-family:var(--font-serif)]">
              Jenis Peraturan
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {jenisPeraturan.map((j) => (
                <li key={j.slug}>
                  <Link
                    href={`/peraturan?jenis=${j.slug}`}
                    className="flex h-full min-h-32 flex-col justify-between rounded-lg border border-[#BFDBFE] bg-white p-4 transition-colors hover:border-[#2563EB] hover:bg-[#DBEAFE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2457D6]"
                  >
                    <span className="font-semibold leading-snug">{j.nama}</span>
                    <span className="text-sm text-[#5B6A85]">
                      {j.jumlah} dokumen
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#BFDBFE] bg-white py-6 text-center text-sm text-[#7A869A]">
        © {new Date().getFullYear()} {APP_NAME}. Sistem Manajemen Peraturan
        Direktur.
      </footer>
    </div>
  );
}
