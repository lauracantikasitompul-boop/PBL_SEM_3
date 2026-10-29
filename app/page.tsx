import Dropdown from "./components/dropdown";
import Header from "./components/header";

// Pilihan jenis peraturan (sesuai desain Figma)
const jenisPeraturan = [
  "Kebijakan Internal",
  "Kebijakan Eksternal",
  "Pedoman Internal",
  "Pedoman Bisnis",
];

// Buat daftar tahun otomatis dari tahun sekarang sampai 2000.
// Jadi tahun depan tidak perlu edit kode lagi.
const tahunSekarang = new Date().getFullYear();
const daftarTahun: string[] = ["All Years"]; // "All Years" selalu di paling atas
for (let t = tahunSekarang; t >= 2000; t--) {
  daftarTahun.push(String(t)); // dropdown menerima string, jadi angka diubah ke teks
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND: foto kampus yang di-blur.
          Blur hanya di layer ini supaya teks di atasnya tetap tajam */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/bg-polibatam.jpg')" }}
      />

      {/* Semua konten ada di atas background (relative z-10) */}
      <div className="relative z-10">
        <Header />

        {/* KONTEN TENGAH */}
        <main className="flex flex-col items-center px-4 pt-24">
          <h1 className="text-center text-4xl font-light text-white">
            Selamat datang di <br /> MAPENA
          </h1>

          {/* SEARCH BAR: input + tombol Search dalam satu kapsul putih */}
          <div className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-2">
            <input
              type="text"
              placeholder="Search.."
              className="flex-1 bg-transparent px-4 text-sm outline-none"
            />
            <button className="rounded-lg bg-[#1e2a78] px-5 py-1.5 text-sm text-white">
              Search
            </button>
          </div>

          {/* PANEL FILTER: kotak abu gelap berisi 2 dropdown */}
          <div className="mt-2 w-full max-w-xs space-y-4 rounded-2xl bg-[#44474a] p-4">
            <Dropdown
              label="Jenis"
              placeholder="Jenis Peraturan"
              options={jenisPeraturan}
            />
            <Dropdown
              label="Tahun"
              placeholder="Tahun Peraturan"
              options={daftarTahun}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
