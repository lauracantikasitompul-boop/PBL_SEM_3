import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import styles from "./daftar.module.css";
import {
  cariPeraturan,
  formatTanggal,
  jenisPeraturan,
  judulLengkap,
  type Status,
  type Urutan,
} from "../data/peraturan";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const satu = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v) ?? "";

const urutanList: { nilai: Urutan; label: string }[] = [
  { nilai: "terbaru", label: "Terbaru" },
  { nilai: "terlama", label: "Terlama" },
  { nilai: "terpopuler", label: "Terpopuler" },
];

const chipClass: Record<Status, string> = {
  Aktif: styles.chipOk,
  Diganti: styles.chipWarn,
  Dicabut: styles.chipBad,
};

/** Membuat alamat /peraturan?... dengan mempertahankan pencarian dan filter */
function buatUrl(p: {
  q?: string;
  jenis?: string;
  tahun?: string;
  urut?: string;
}) {
  const sp = new URLSearchParams();
  if (p.q) sp.set("q", p.q);
  if (p.jenis) sp.set("jenis", p.jenis);
  if (p.tahun) sp.set("tahun", p.tahun);
  if (p.urut && p.urut !== "terbaru") sp.set("urut", p.urut);
  const qs = sp.toString();
  return qs ? `/peraturan?${qs}` : "/peraturan";
}

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

const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
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

const DownloadIcon = () => (
  <Icon>
    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
  </Icon>
);

const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

/* ---------- Halaman ---------- */

export default async function DaftarPeraturan({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const q = satu(sp.q).trim();

  const jenisParam = satu(sp.jenis);
  const jenis = (jenisPeraturan as readonly string[]).includes(jenisParam)
    ? jenisParam
    : "";

  const tahunParam = satu(sp.tahun);
  const tahun = /^\d{4}$/.test(tahunParam) ? tahunParam : "";

  const urutParam = satu(sp.urut);
  const urut: Urutan =
    urutParam === "terlama" || urutParam === "terpopuler"
      ? urutParam
      : "terbaru";

  const hasil = cariPeraturan({ q, jenis, tahun, urut });
  const judulHalaman = jenis || "Semua Peraturan";

  return (
    <main className={styles.page}>
      <Navbar active="peraturan" activeJenis={jenis || undefined} />

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
              {jenis && <li aria-current="page">{jenis}</li>}
            </ol>
          </nav>

          <h1>{judulHalaman}</h1>
          <p>
            {jenis
              ? `Daftar peraturan direktur dengan jenis ${jenis}.`
              : "Daftar seluruh peraturan direktur."}
          </p>
        </div>
      </section>

      <div className={`${styles.container} ${styles.content}`}>
        {/* Pencarian */}
        <form
          className={styles.searchForm}
          action="/peraturan"
          method="get"
          role="search"
        >
          {jenis && <input type="hidden" name="jenis" value={jenis} />}
          {tahun && <input type="hidden" name="tahun" value={tahun} />}
          {urut !== "terbaru" && (
            <input type="hidden" name="urut" value={urut} />
          )}

          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder={`Cari di ${judulHalaman.toLowerCase()}...`}
              aria-label="Cari peraturan"
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Cari
          </button>
        </form>

        {/* Jumlah hasil + urutan */}
        <div className={styles.resultBar}>
          <div className={styles.resultInfo}>
            <p>
              Ditemukan <strong>{hasil.length}</strong> peraturan
              {q && (
                <>
                  {" "}
                  untuk &ldquo;<strong>{q}</strong>&rdquo;
                </>
              )}
            </p>

            {tahun && (
              <Link
                href={buatUrl({ q, jenis, urut })}
                className={styles.filterChip}
              >
                Tahun {tahun}
                <span aria-hidden="true">&times;</span>
                <span className={styles.srOnly}>Hapus filter tahun</span>
              </Link>
            )}
          </div>

          <nav className={styles.sort} aria-label="Urutkan">
            {urutanList.map((u) => (
              <Link
                key={u.nilai}
                href={buatUrl({ q, jenis, tahun, urut: u.nilai })}
                className={urut === u.nilai ? styles.sortActive : undefined}
                aria-current={urut === u.nilai ? "true" : undefined}
              >
                {u.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Daftar peraturan */}
        {hasil.length === 0 ? (
          <div className={styles.empty}>
            <p>Tidak ada peraturan yang cocok dengan pencarianmu.</p>
            <Link href={buatUrl({ jenis })} className={styles.emptyLink}>
              Tampilkan semua{jenis ? ` ${jenis}` : " peraturan"}
            </Link>
          </div>
        ) : (
          <ul className={styles.list}>
            {hasil.map((p) => (
              <li key={p.slug}>
                <article className={styles.card}>
                  <span className={styles.tag}>{judulLengkap(p)}</span>

                  <h2 className={styles.title}>{p.tentang}</h2>

                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <CalendarIcon />
                      Ditetapkan: {formatTanggal(p.tanggalDitetapkan)}
                    </span>
                    <span className={styles.metaItem}>{p.kategori}</span>
                    <span
                      className={`${styles.statusChip} ${chipClass[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.actions}>
                      <a
                        href={p.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.buttonOutline}
                      >
                        <EyeIcon />
                        Lihat
                      </a>
                      <a
                        href={p.file.url}
                        download
                        className={styles.buttonOutline}
                      >
                        <DownloadIcon />
                        Download
                      </a>
                      <Link
                        href={`/peraturan/${p.slug}`}
                        className={styles.buttonSolid}
                      >
                        Detail
                        <ArrowIcon />
                      </Link>
                    </div>

                    <div className={styles.stats}>
                      <span>
                        <EyeIcon />
                        {p.views} dilihat
                      </span>
                      <span>
                        <DownloadIcon />
                        {p.downloads} diunduh
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}