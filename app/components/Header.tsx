import Image from "next/image";
import Link from "next/link";

// showLogin = apakah tombol Login ditampilkan di kanan header.
// Home: tampil. Halaman login: disembunyikan (sesuai desain Figma).
type HeaderProps = {
  showLogin?: boolean;
};

export default function Header({ showLogin = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-white px-6 py-3">
      {/* Kiri: logo + nama aplikasi */}
      <div className="flex items-center gap-3">
        <Image src="/logo (1).png" alt="Logo Polibatam" width={48} height={32} />
        <div className="text-sm text-[#1e2a78]">
          <p className="font-semibold">MAPENA</p>
          <p>Manajemen Peraturan Berbasis notifikasi</p>
        </div>
      </div>

      {/* Kanan: tombol Login. Link = pindah halaman ke /login tanpa reload */}
      {showLogin && (
        <Link
          href="/login"
          className="rounded bg-[#1e2a78] px-4 py-1 text-xs text-white"
        >
          Login
        </Link>
      )}
    </header>
  );
}
