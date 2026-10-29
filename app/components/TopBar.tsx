import Link from "next/link";

// judul = tulisan di top bar ("Dashboard", "Kebijakan Eksternal", dst)
export default function TopBar({ judul }: { judul: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white pb-2">
      <div className="flex items-center gap-2">
        {/* Tombol kembali ke Home */}
        <Link href="/login" aria-label="Kembali ke login">
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

      {/* Ikon profil user */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-black"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
      </svg>
    </div>
  );
}
