import Link from "next/link";

// Props = data yang dikirim dari halaman induk ke komponen ini
type TopBarProps = {
  judul: string; // tulisan di top bar ("Dashboard", "Kebijakan Eksternal", dst)
  kembaliKe?: string; // tujuan tombol kembali. Tanda ? = boleh tidak diisi
};

// kembaliKe = "/login" artinya kalau tidak diisi, otomatis kembali ke halaman Login
export default function TopBar({ judul, kembaliKe = "/login" }: TopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-white pb-2">
      <div className="flex items-center gap-2">
        {/* Tombol kembali: tujuannya mengikuti prop kembaliKe */}
        <Link href={kembaliKe} aria-label="Kembali">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-black"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </Link>
        <h1 className="text-xl text-black">{judul}</h1>
      </div>

      {/* Ikon profil: sekarang berupa Link, klik untuk menuju halaman /dashboard/profil.
          aria-label = label untuk screen reader karena tombolnya cuma ikon */}
      <Link
        href="/dashboard/profil"
        aria-label="Profil"
        className="rounded-full p-1 text-black hover:bg-white/40"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </svg>
      </Link>
    </div>
  );
}
