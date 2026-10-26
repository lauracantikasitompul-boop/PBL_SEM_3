import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./detail.module.css";
import {
  formatTanggal,
  getPeraturan,
  judulLengkap,
  type Status,
} from "../../data/peraturan";

const chipClass: Record<Status, string> = {
  Aktif: styles.chipOk,
  Diganti: styles.chipWarn,
  Dicabut: styles.chipBad,
};

/* ---------- Ikon kecil ---------- */

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

const BookmarkIcon = () => (
  <Icon>
    <path d="M6 3h12v18l-6-4-6 4z" />
  </Icon>
);

const ListIcon = () => (
  <Icon>
    <path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </Icon>
);

const FileIcon = () => (
  <Icon>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </Icon>
);

const HistoryIcon = () => (
  <Icon>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5M12 7v5l3 2" />
  </Icon>
);

const EyeIcon = () => (
  <Icon>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const DownloadIcon = () => (
  <Icon>
    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
  </Icon>
);

/* ---------- Halaman ---------- */

export default async function DetailPeraturan({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPeraturan(slug);

  if (!data) notFound();

  const judul = judulLengkap(data);

  const metadata = [
    { label: "Subjek", value: data.subjek },
    { label: "Kategori", value: data.kategori },
    { label: "Nomor", value: data.nomor },
    { label: "Tanggal Ditetapkan", value: formatTanggal(data.tanggalDitetapkan) },
  ];

  return (
    <main className={styles.page}>
      {/* Navbar */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>MAPENA</span>
          <span className={styles.brandSub}>Riwayat Peraturan Direktur</span>
        </Link>

        <div className={styles.topActions}>
          <Link href="/" className={styles.backLink}>
            Kembali ke Beranda
          </Link>
          <Link href="/login" className={styles.loginButton}>
            Login Admin
          </Link>
        </div>
      </header>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.container}>
          <nav aria-label="Jejak halaman">
            <ol className={styles.crumbs}>
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/peraturan">Peraturan</Link>
              </li>
              <li aria-current="page">{judul}</li>
            </ol>
          </nav>

          <p className={styles.bannerTitle}>{judul}</p>
          <h1>{data.tentang}</h1>

          <div className={styles.bannerStatus}>
            <span className={`${styles.statusChip} ${chipClass[data.status]}`}>
              {data.status}
            </span>
          </div>
        </div>
      </section>

      {/* Isi */}
      <div className={`${styles.container} ${styles.layout}`}>
        {/* Kolom kiri: materi pokok + metadata */}
        <div className={styles.column}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <BookmarkIcon />
              <h2>Materi Pokok Peraturan</h2>
            </div>
            <p className={styles.abstract}>{data.abstrak}</p>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <ListIcon />
              <h2>Metadata Peraturan</h2>
            </div>

            <dl className={styles.metadata}>
              {metadata.map((m) => (
                <div key={m.label} className={styles.metaRow}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Kolom kanan: file + riwayat */}
        <div className={styles.column}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <FileIcon />
              <h2>File Peraturan</h2>
            </div>

            <p className={styles.fileName}>{data.file.nama}</p>

            <div className={styles.fileActions}>
              <a
                href={data.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fileButton}
              >
                <EyeIcon />
                Lihat
              </a>
              <a
                href={data.file.url}
                download
                className={styles.fileButton}
              >
                <DownloadIcon />
                Unduh
              </a>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <HistoryIcon />
              <h2>Riwayat Peraturan</h2>
            </div>

            <div className={styles.statusRow}>
              <span>Status saat ini</span>
              <span className={`${styles.statusChip} ${chipClass[data.status]}`}>
                {data.status}
              </span>
            </div>

            {data.riwayat.length === 0 ? (
              <p className={styles.empty}>Belum ada riwayat perubahan.</p>
            ) : (
              data.riwayat.map((grup) => (
                <div key={grup.label} className={styles.relationGroup}>
                  <p className={styles.relationLabel}>{grup.label} :</p>

                  <ol type="a" className={styles.relationList}>
                    {grup.items.map((item) => (
                      <li key={item.judul}>
                        {item.slug ? (
                          <Link href={`/peraturan/${item.slug}`}>
                            {item.judul}
                          </Link>
                        ) : (
                          item.judul
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}