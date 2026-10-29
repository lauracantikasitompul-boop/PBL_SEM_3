import TopBar from "../components/topbar";

// Data kartu statistik (angka dummy dari Figma, nanti dari database)
const statistik = [
  { judul: "Kebijakan Eksternal", jumlah: 13 },
  { judul: "Kebijakan Internal", jumlah: 15 },
  { judul: "Pedoman Internal", jumlah: 15 },
  { judul: "Proses Bisnis", jumlah: 38 },
];

// Data notifikasi dummy. status: Berlaku / Cabut / Ganti
const notifikasi = [
  { no: 5, judul: "", tipe: "", tanggal: "", status: "Berlaku" },
  { no: 4, judul: "", tipe: "", tanggal: "", status: "Cabut" },
  { no: 3, judul: "", tipe: "", tanggal: "", status: "Berlaku" },
  { no: 2, judul: "", tipe: "", tanggal: "", status: "Ganti" },
  { no: 1, judul: "", tipe: "", tanggal: "", status: "Cabut" },
];

// Warna badge tiap status
const warnaStatus: Record<string, string> = {
  Berlaku: "bg-green-500 text-white",
  Cabut: "bg-gray-400 text-black",
  Ganti: "bg-sky-300 text-black",
};

// Pembagian kolom tabel, dipakai di header DAN baris supaya sejajar
const kolom = "grid grid-cols-[3rem_1fr_1fr_1fr_6rem_5rem] items-center px-4";

export default function DasboardPage() {
  return (
    <main className="flex-1 p-4">
      <TopBar judul="Dasboard" />

      {/* KARTU STATISTIK: 4 kotak putih */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statistik.map((s) => (
          <div key={s.judul} className="rounded-3xl bg-white p-3">
            <p className="text-xs text-black">{s.judul}</p>
            <p className="mt-3 text-right text-sm text-black">{s.jumlah}</p>
          </div>
        ))}
      </div>

      {/* PANEL NOTIFIKASI: kotak putih transparan */}
      <section className="mt-4 rounded-3xl bg-white/60 p-4 backdrop-blur-sm">
        <h2 className="text-lg text-black">Notifikasi</h2>

        {/* Header tabel: bar biru gelap bulat */}
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

        {/* Baris data: border-b = garis putih pemisah antar baris */}
        {notifikasi.map((n) => (
          <div
            key={n.no}
            className={`${kolom} border-b border-white py-3 text-xs text-black`}
          >
            <span>{n.no}</span>
            <span>{n.judul}</span>
            <span>{n.tipe}</span>
            <span>{n.tanggal}</span>

            {/* Badge status, warnanya diambil dari warnaStatus */}
            <span className="text-center">
              <span
                className={`rounded-full px-3 py-0.5 ${warnaStatus[n.status]}`}
              >
                {n.status}
              </span>
            </span>

            {/* Ikon aksi: edit & hapus (belum ada fungsi) */}
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
              <button aria-label="Hapus">
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
      </section>
    </main>
  );
}
