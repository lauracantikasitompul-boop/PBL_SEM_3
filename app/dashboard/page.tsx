import Link from "next/link";
import styles from "./dashboard.module.css";


const menu = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Kebutuhan Internal", href: "#" },
  { label: "Kebutuhan Eksternal", href: "#" },
  { label: "Pedoman Internal", href: "#" },
  { label: "Pedoman Bisnis", href: "#" },
];

const stats = [
  { label: "Kebutuhan Internal", total: 15 },
  { label: "Kebutuhan Eksternal", total: 15 },
  { label: "Pedoman Internal", total: 15 },
  { label: "Pedoman Bisnis", total: 38 },
];

type Tone = "info" | "ok" | "warn" | "bad";

const notifications: { text: string; tag: string; tone: Tone }[] = [
  { text: "Peraturan baru telah diterbitkan.", tag: "Baru", tone: "info" },
  {
    text: "Peraturan Direktur Nomor 03 Tahun 2026 telah aktif.",
    tag: "Aktif",
    tone: "ok",
  },
  {
    text: "Peraturan Direktur Nomor 05 Tahun 2024 telah diganti.",
    tag: "Diganti",
    tone: "warn",
  },
  {
    text: "Peraturan Direktur Nomor 02 Tahun 2023 telah dicabut.",
    tag: "Dicabut",
    tone: "bad",
  },
  {
    text: "Terdapat perubahan pada peraturan yang berlaku.",
    tag: "Perubahan",
    tone: "info",
  },
];

const toneClass: Record<Tone, string> = {
  info: styles.toneInfo,
  ok: styles.toneOk,
  warn: styles.toneWarn,
  bad: styles.toneBad,
};

const aktif = 260;
const tidakAktif = 80;


export default function Dashboard() {
  const total = aktif + tidakAktif;
  const aktifPersen = Math.round((aktif / total) * 100);
  const tidakAktifPersen = 100 - aktifPersen;

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>MAPENA</div>

        <nav aria-label="Menu utama">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.active ? styles.active : undefined}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <h1>Dashboard</h1>
          <p>Ringkasan peraturan direktur dan pemberitahuan terbaru.</p>
        </header>

        <div className={styles.stats}>
          {stats.map((item) => (
            <div key={item.label} className={styles.card}>
              <p className={styles.cardLabel}>{item.label}</p>
              <strong>{item.total}</strong>
              <span>item</span>
            </div>
          ))}
        </div>

        <div className={styles.middle}>
          <div className={styles.leftColumn}>
            <section className={styles.notifications}>
              <h2>Pemberitahuan</h2>

              <ul className={styles.notificationList}>
                {notifications.map((n) => (
                  <li key={n.text} className={toneClass[n.tone]}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.notificationText}>{n.text}</span>
                    <span className={styles.tag}>{n.tag}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.status}>
              <div className={styles.statusHeader}>
                <h2>Status Peraturan</h2>
                <span className={styles.statusTotal}>{total} peraturan</span>
              </div>

              <div
                className={styles.statusBar}
                role="img"
                aria-label={`${aktif} aktif (${aktifPersen}%), ${tidakAktif} tidak aktif (${tidakAktifPersen}%)`}
              >
                <span
                  className={styles.barActive}
                  style={{ width: `${(aktif / total) * 100}%` }}
                />
              </div>

              <div className={styles.statusCards}>
                <div className={styles.statusCard}>
                  <span className={`${styles.statusName} ${styles.swatchActive}`}>
                    Aktif
                  </span>
                  <strong>{aktif}</strong>
                  <span className={styles.statusPercent}>{aktifPersen}%</span>
                </div>

                <div className={styles.statusCard}>
                  <span
                    className={`${styles.statusName} ${styles.swatchInactive}`}
                  >
                    Tidak Aktif
                  </span>
                  <strong>{tidakAktif}</strong>
                  <span className={styles.statusPercent}>
                    {tidakAktifPersen}%
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section className={styles.createNotification}>
            <h2>Buat Pemberitahuan</h2>

            <div className={styles.notificationForm}>
              <textarea
                placeholder="Tulis pemberitahuan..."
                aria-label="Isi pemberitahuan"
              />

              <button type="button">Buat Pemberitahuan</button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}