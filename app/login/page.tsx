"use client"; // Wajib: halaman ini pakai useState dan useRouter (jalan di browser)

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // untuk pindah halaman lewat kode
import Header from "../components/Header";

export default function LoginPage() {
  const router = useRouter();

  // Menyimpan isi input username & password selagi diketik
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Dijalankan saat tombol Log In ditekan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // cegah reload bawaan form
    // SEMENTARA: semua login langsung masuk dashboard.
    // TODO: nanti diganti cek username/password beneran.
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND: foto kampus di-blur (sama seperti Home) */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/bg-poli.jpg')" }}
      />

      <div className="relative z-10">
        {/* Header tanpa tombol Login (showLogin = false) */}
        <Header showLogin={false} />

        {/* TOMBOL KEMBALI: ikon panah di bawah header, klik untuk ke Home ("/") */}
        <div className="px-6 pt-3">
          <Link
            href="/"
            aria-label="Kembali ke Home"
            className="inline-block text-black"
          >
            {/* Ikon SVG; stroke="currentColor" = warna ikut text-black */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </Link>
        </div>

        <main className="flex justify-center px-4 pt-4">
          {/* KARTU LOGIN: abu transparan + efek kaca (backdrop-blur) */}
          <div className="w-full max-w-xs rounded-[2rem] bg-gray-600/60 px-6 pb-10 pt-4 backdrop-blur-md">
            {/* Logo di tengah, garis putih di bawahnya */}
            <div className="flex justify-center border-b border-white pb-2">
              <Image
                src="/logo (1).png"
                alt="Logo Polibatam"
                width={48}
                height={32}
              />
            </div>

            {/* Judul */}
            <h1 className="mt-3 text-center text-2xl text-white">
              Welcome back!
            </h1>
            <p className="text-center text-[10px] text-white">
              Sign in to access
            </p>

            {/* FORM: onSubmit memanggil handleSubmit */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Input username */}
              <div>
                <label htmlFor="username" className="text-[10px] text-white">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // update state tiap ketik
                  required
                  className="w-full bg-white px-3 py-2 text-sm text-black outline-none"
                />
              </div>

              {/* Input password: type="password" menyembunyikan huruf */}
              <div>
                <label htmlFor="password" className="text-[10px] text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white px-3 py-2 text-sm text-black outline-none"
                />
              </div>

              {/* Tombol Log In */}
              <button
                type="submit"
                className="w-full rounded-full bg-white py-2 text-xs text-black hover:bg-gray-200"
              >
                Log In
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
