import TopBar from "../../components/TopBar";
import KategoriGrid from "../../components/KategoriGrid";

// Data kategori SEMENTARA (contoh). Ganti sesuai Figma.
const kategori = [
  { nama: "Akademik", jumlah: 3 },
  { nama: "Kepegawaian", jumlah: 4 },
  { nama: "Keuangan", jumlah: 3 },
  { nama: "Kemahasiswaan", jumlah: 3 },
];

export default function KebijakanInternalPage() {
  return (
    <main className="flex-1 p-4">
      <TopBar judul="Kebijakan Internal" />
      <KategoriGrid data={kategori} />
    </main>
  );
}
