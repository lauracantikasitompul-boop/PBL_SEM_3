// Bentuk data satu kategori
type Kategori = {
  nama: string; // nama kategori
  jumlah: number; // jumlah peraturan di kategori itu
};

// data = daftar kategori yang dikirim dari halaman induk (props)
export default function KategoriGrid({ data }: { data: Kategori[] }) {
  return (
    // 2 kolom di layar kecil, 4 kolom di layar besar
    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* map() = ulangi kotak untuk tiap kategori di array */}
      {data.map((k) => (
        <div
          key={k.nama} // key wajib saat membuat list di React
          className="flex min-h-20 flex-col justify-between rounded-xl bg-white p-3"
        >
          <p className="text-[10px] font-medium uppercase text-black">
            {k.nama}
          </p>
          <p className="text-right text-xs text-black">{k.jumlah}</p>
        </div>
      ))}
    </div>
  );
}
