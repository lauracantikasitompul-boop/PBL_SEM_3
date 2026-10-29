import Sidebar from "../components/sidebar";

// Layout = "pembungkus" semua halaman di folder /dashboard.
// {children} = isi halaman yang sedang dibuka.
export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND blur, cukup ditulis sekali di sini */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/bg-poli.jpg')" }}
      />

      {/* Sidebar tetap di kiri, konten halaman di kanan */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
