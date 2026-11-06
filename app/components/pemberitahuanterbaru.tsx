"use client"; // Wajib: membaca localStorage (hanya ada di browser)

import { useEffect, useState } from "react";
import styles from "../home.module.css"; // pakai CSS milik Home, tampilannya sama persis
import {
  bacaNotifikasi,
  type Notifikasi,
  type Status,
} from "../lib/notifikasi";

type Tone = "info" | "ok" | "warn" | "bad" | "alt";

// Bentuk satu baris pemberitahuan di Home (sama dengan data contoh temanmu)
export type Pemberitahuan = {
  text: string;
  tag: string;
  tone: Tone;
  date: string;
};

// Tone -> nama kelas CSS (dari home.module.css)
const toneClass: Record<Tone, string> = {
  info: styles.toneInfo,
  ok: styles.toneOk,
  warn: styles.toneWarn,
  bad: styles.toneBad,
  alt: styles.toneAlt,
};

// Status di admin -> label, warna, dan kalimat di Home
const petaStatus: Record<Status, { tag: string; tone: Tone; akhiran: string }> =
  {
    Berlaku: { tag: "Aktif", tone: "ok", akhiran: "telah aktif." },
    Cabut: { tag: "Dicabut", tone: "bad", akhiran: "telah dicabut." },
    Ganti: { tag: "Diganti", tone: "warn", akhiran: "telah diganti." },
  };

const bulan = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

// Ubah "2026-11-05" menjadi "5 Nov 2026" (gaya yang sama dengan data contoh)
function tanggalPendek(t: string) {
  const [tahun, bln, hari] = t.split("-");
  return `${Number(hari)} ${bulan[Number(bln) - 1]} ${tahun}`;
}

// Ubah satu notifikasi admin menjadi baris pemberitahuan Home
function keBaris(n: Notifikasi): Pemberitahuan {
  const p = petaStatus[n.status];
  return {
    text: `${n.judul} ${p.akhiran}`,
    tag: p.tag,
    tone: p.tone,
    date: tanggalPendek(n.tanggal),
  };
}

const MAKS = 5; // jumlah baris yang ditampilkan di panel

// contoh = data contoh temanmu, dikirim dari page.tsx lewat props
export default function PemberitahuanTerbaru({
  contoh,
}: {
  contoh: Pemberitahuan[];
}) {
  // Awalnya tampilkan data contoh dulu (sama dengan tampilan sebelumnya)
  const [daftar, setDaftar] = useState<Pemberitahuan[]>(contoh.slice(0, MAKS));

  // Setelah halaman tampil di browser, baca notifikasi buatan admin
  useEffect(() => {
    console.log("notifikasi admin:", bacaNotifikasi());
    const dariAdmin = (bacaNotifikasi() ?? [])
      .filter((n) => n.judul.trim() !== "") // buang baris dummy yang judulnya kosong
      .sort((a, b) => b.id - a.id) // yang terbaru dibuat di paling atas
      .map(keBaris);

    // Notifikasi admin di atas, data contoh di bawahnya, dibatasi MAKS baris
    setDaftar([...dariAdmin, ...contoh].slice(0, MAKS));
  }, [contoh]);

  return (
    <ul className={styles.list}>
      {daftar.map((n, i) => (
        <li key={`${i}-${n.text}`} className={toneClass[n.tone]}>
          <div className={styles.notificationItem}>
            <span className={styles.tag}>{n.tag}</span>
            <span>{n.text}</span>
            <span className={styles.date}>{n.date}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
