import TopBar from "../../components/topbar";
import KategoriGrid from "../../components/kategorigrid";

// Data kategori SEMENTARA (contoh). Ganti sesuai Figma.
const kategori = [
  { nama: "Akademik", jumlah: 3 },
  { nama: "Kepegawaian", jumlah: 4 },
  { nama: "Keuangan", jumlah: 3 },
];

export default function PedomanInternalPage() {
  return (
    <main className="flex-1 p-4">
      <TopBar judul="Pedoman Internal" />
      <KategoriGrid data={kategori} />
    </main>
  );
}
