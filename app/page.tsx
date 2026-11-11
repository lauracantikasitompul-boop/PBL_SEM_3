import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./home.module.css";
import Navbar from "./components/Navbar";
import PemberitahuanTerbaru from "./components/pemberitahuanterbaru";
import {
  formatTanggal,
  labelNomorTahun,
  peraturanTerbaru,
  peraturanTerpopuler,
  type Peraturan,
  type Status,
} from "./data/peraturan";


type Tone = "info" | "ok" | "warn" | "bad" | "alt";

const jenisDokumen = [
  "Kebutuhan Internal",
  "Kebutuhan Eksternal",
  "Pedoman Internal",
  "Pedoman Bisnis",
];

const tahun = [2026, 2025, 2024, 2023];

const notifications: { text: string; tag: string; tone: Tone; date: string }[] =
  [
    {
      text: "Peraturan Direktur Nomor 03 Tahun 2026 telah aktif.",
      tag: "Aktif",
      tone: "ok",
      date: "22 Okt 2026",
    },
    {
      text: "Peraturan Direktur Nomor 05 Tahun 2024 telah diganti oleh Nomor 07 dan Nomor 08 Tahun 2026.",
      tag: "Diganti",
      tone: "warn",
      date: "20 Okt 2026",
    },
    {
      text: "Peraturan Direktur Nomor 02 Tahun 2023 telah dicabut.",
      tag: "Dicabut",
      tone: "bad",
      date: "15 Okt 2026",
    },
    {
      text: "Peraturan Direktur Nomor 06 Tahun 2026 telah diterbitkan.",
      tag: "Baru",
      tone: "info",
      date: "12 Okt 2026",
    },
    {
      text: "Terdapat perubahan pada Peraturan Direktur Nomor 01 Tahun 2025.",
      tag: "Perubahan",
      tone: "alt",
      date: "8 Okt 2026",
    },
  ];

/* Jumlah peraturan per jenis (angka contoh; nanti ganti dengan hitungan dari database) */

const jumlahPerJenis = [
  { nama: "Kebutuhan Internal", jumlah: 20 },
  { nama: "Kebutuhan Eksternal", jumlah: 30 },
  { nama: "Pedoman Internal", jumlah: 30 },
  { nama: "Pedoman Bisnis", jumlah: 30 },
];

const totalPeraturan = jumlahPerJenis.reduce((total, j) => total + j.jumlah, 0);

type Regulasi = {
  jenis: string;
  tanggal: string;
  judul: string;
  status: Status;
  deskripsi: string;
  views: number;
  href: string;
};

// Kartu dibuat dari data bersama (app/data/peraturan.ts),
// jadi tombol "Lihat Detail" selalu menuju halaman yang ada.
const keKartu = (p: Peraturan): Regulasi => ({
  jenis: p.kategori,
  tanggal: formatTanggal(p.tanggalDitetapkan, "short"),
  judul: labelNomorTahun(p),
  status: p.status,
  deskripsi: p.tentang,
  views: p.views,
  href: `/peraturan/${p.slug}`,
});

const daftarTerbaru: Regulasi[] = peraturanTerbaru().map(keKartu);
const daftarTerpopuler: Regulasi[] = peraturanTerpopuler().map(keKartu);

const chipClass: Record<Status, string> = {
  Aktif: styles.chipOk,
  Diganti: styles.chipWarn,
  Dicabut: styles.chipBad,
};


function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

const TrendIcon = () => (
  <Icon>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </Icon>
);

const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
);

const EyeIcon = () => (
  <Icon>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

type Variant = "latest" | "popular";

function RegulationCard({
  item,
  variant,
}: {
  item: Regulasi;
  variant: Variant;
}) {
  return (
    <article
      className={`${styles.regCard} ${
        variant === "latest" ? styles.regLatest : styles.regPopular
      }`}
    >
      <div className={styles.regTop}>
        <span className={styles.regTag}>{item.jenis}</span>
        <span className={styles.regDate}>
          <CalendarIcon />
          {item.tanggal}
        </span>
      </div>

      <h3 className={styles.regTitle}>{item.judul}</h3>
      <span className={`${styles.statusChip} ${chipClass[item.status]}`}>
        {item.status}
      </span>

      <p className={styles.regDesc}>{item.deskripsi}</p>

      <div className={styles.regFooter}>
        <span className={styles.regViews}>
          <EyeIcon />
          {item.views} dilihat
        </span>
        <Link href={item.href} className={styles.regButton}>
          Lihat Detail
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

function RegulationSection({
  title,
  icon,
  variant,
  items,
}: {
  title: string;
  icon: ReactNode;
  variant: Variant;
  items: Regulasi[];
}) {
  return (
    <section className={styles.regSection}>
      <h2
        className={`${styles.sectionPill} ${
          variant === "latest" ? styles.pillLatest : styles.pillPopular
        }`}
      >
        {icon}
        {title}
      </h2>

      <div className={styles.regGrid}>
        {items.map((item) => (
          <RegulationCard key={item.judul} item={item} variant={variant} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.darkArea}>
        {/* Navbar */}
        <Navbar active="beranda" transparan />

        <div className={styles.container}>
          {/* Hero + pencarian */}
          <section className={styles.hero}>
            <h1>
              Selamat datang di <span className={styles.accent}>MAPENA</span>
            </h1>

            <p className={styles.lead}>
              Cari peraturan direktur, pantau riwayat perubahannya, dan lihat
              status keberlakuannya dalam satu tempat.
            </p>

            <form
              className={styles.search}
              action="/peraturan"
              method="get"
              role="search"
            >
              <div className={styles.searchBox}>
                <svg
                  className={styles.searchIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  name="q"
                  placeholder="Cari peraturan..."
                  aria-label="Cari peraturan"
                />
                <button type="submit">Cari</button>
              </div>

              <div className={styles.filters}>
                <select
                  name="jenis"
                  aria-label="Jenis peraturan"
                  defaultValue=""
                >
                  <option value="">Semua Jenis</option>
                  {jenisDokumen.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>

                <select name="tahun" aria-label="Tahun" defaultValue="">
                  <option value="">Semua Tahun</option>
                  {tahun.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </section>

          {/* Pemberitahuan (kiri) + Jumlah peraturan per jenis (kanan) */}
          <section className={styles.panels}>
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2>Pemberitahuan Terbaru</h2>
                <Link href="/#pemberitahuan" className={styles.panelLink}>
                  Lihat semua
                </Link>
              </div>

              <PemberitahuanTerbaru contoh={notifications} />
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2>Jumlah Peraturan per Jenis</h2>
                <span className={styles.panelMeta}>
                  {totalPeraturan} peraturan
                </span>
              </div>

              <ul className={styles.typeGrid}>
                {jumlahPerJenis.map((j) => (
                  <li key={j.nama}>
                    <Link
                      href={`/peraturan?jenis=${encodeURIComponent(j.nama)}`}
                      className={styles.typeBox}
                    >
                      <span className={styles.typeCount}>
                        <strong>{j.jumlah}</strong>
                        <small>peraturan</small>
                      </span>
                      <span className={styles.typeName}>{j.nama}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className={styles.regulations}>
        <div className={styles.container}>
          <RegulationSection
            title="Peraturan Terbaru"
            icon={<ClockIcon />}
            variant="latest"
            items={daftarTerbaru}
          />

          <RegulationSection
            title="Peraturan Terpopuler"
            icon={<TrendIcon />}
            variant="popular"
            items={daftarTerpopuler}
          />
        </div>

        <footer className={styles.footer}>
          © 2026 MAPENA. Seluruh data di halaman ini masih contoh.
        </footer>
      </div>
    </main>
  );
}