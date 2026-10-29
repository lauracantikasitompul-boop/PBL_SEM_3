import TopBar from "../../components/TopBar";
import KategoriGrid from "../../components/KategoriGrid";

// Data kategori SEMENTARA (contoh). Ganti sesuai Figma.
const kategori = [
  { nama: "Akademik", jumlah: 10 },
  { nama: "Kepegawaian", jumlah: 8 },
  { nama: "Keuangan", jumlah: 12 },
  { nama: "Sistem Informasi", jumlah: 8 },
];

export default function ProsesBisnisPage() {
  return (
    <main className="flex-1 p-4">
      <TopBar judul="Proses Bisnis" />
      <KategoriGrid data={kategori} />
    </main>
  );
}
