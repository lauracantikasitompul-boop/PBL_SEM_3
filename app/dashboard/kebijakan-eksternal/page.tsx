import TopBar from "../../components/topbar";
import KategoriGrid from "../../components/kategorigrid";

// Data kategori (dummy dari Figma, nanti diambil dari database)
const kategori = [
  { nama: "Akademik", jumlah: 3 },
  { nama: "Bagian Umum", jumlah: 3 },
  { nama: "Kepegawaian", jumlah: 4 },
  { nama: "Keuangan", jumlah: 3 },
  { nama: "Penelitian dan Pengabdian Masyarakat", jumlah: 3 },
  { nama: "Pendaftaran", jumlah: 3 },
  { nama: "Perlengkapan", jumlah: 4 },
  { nama: "Perawatan dan Perbaikan", jumlah: 3 },
  { nama: "Kemahasiswaan", jumlah: 3 },
  { nama: "Perpustakaan", jumlah: 4 },
  { nama: "Satuan Pengawasan Internal", jumlah: 3 },
  { nama: "Sistem Informasi", jumlah: 3 },
  { nama: "Lainnya", jumlah: 3 },
];

export default function KebijakanEksternalPage() {
  return (
    // Sidebar dan background sudah dipegang dashboard/layout.tsx
    <main className="flex-1 p-4">
      <TopBar judul="Kebijakan Eksternal" />
      <KategoriGrid data={kategori} />
    </main>
  );
}
