"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { jenisPeraturan } from "../data/peraturan";

export type NavKey =
  | "beranda"
  | "peraturan"
  | "pemberitahuan"
  | "tentang";

type Props = {
  /** Menu yang sedang aktif */
  active?: NavKey;
  /** Jenis peraturan yang sedang dibuka (untuk menandai item di dropdown) */
  activeJenis?: string;
  /** true = latar transparan (dipakai di homepage yang berlatar gradasi) */
  transparan?: boolean;
};

const SUBJUDUL = "Peraturan Direktur Polibatam";

export default function Navbar({ active, activeJenis, transparan }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Tutup dropdown saat klik di luar atau menekan Escape
  useEffect(() => {
    if (!open) return;

    const onClickLuar = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onClickLuar);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickLuar);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkClass = (key: NavKey) =>
    `${styles.link} ${active === key ? styles.active : ""}`;

  return (
    <header
      className={`${styles.header} ${transparan ? styles.transparent : ""}`}
    >
      <Link href="/" className={styles.brand}>
        <span className={styles.brandName}>MAPENA</span>
        <span className={styles.brandSub}>{SUBJUDUL}</span>
      </Link>

      <nav className={styles.nav} aria-label="Menu utama">
        <Link
          href="/"
          className={linkClass("beranda")}
          aria-current={active === "beranda" ? "page" : undefined}
        >
          Beranda
        </Link>

        {/* Dropdown Peraturan */}
        <div className={styles.dropdown} ref={wrapRef}>
          <button
            ref={buttonRef}
            type="button"
            className={linkClass("peraturan")}
            aria-expanded={open}
            aria-controls="menu-peraturan"
            onClick={() => setOpen((o) => !o)}
          >
            Peraturan
            <svg
              className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
              viewBox="0 0 12 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 1.5l5 5 5-5" />
            </svg>
          </button>

          {open && (
            <ul id="menu-peraturan" className={styles.menu}>
              <li>
                <Link
                  href="/peraturan"
                  className={`${styles.menuItem} ${
                    active === "peraturan" && !activeJenis
                      ? styles.menuActive
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Semua Peraturan
                </Link>
              </li>

              <li className={styles.divider} role="separator" />

              {jenisPeraturan.map((jenis) => (
                <li key={jenis}>
                  <Link
                    href={`/peraturan?jenis=${encodeURIComponent(jenis)}`}
                    className={`${styles.menuItem} ${
                      activeJenis === jenis ? styles.menuActive : ""
                    }`}
                    aria-current={activeJenis === jenis ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {jenis}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/#pemberitahuan"
          className={linkClass("pemberitahuan")}
          aria-current={active === "pemberitahuan" ? "page" : undefined}
        >
          Pemberitahuan
        </Link>

        <Link
          href="/tentang"
          className={linkClass("tentang")}
          aria-current={active === "tentang" ? "page" : undefined}
        >
          Tentang
        </Link>
      </nav>

      <Link href="/login" className={styles.loginButton}>
        Login Admin
      </Link>
    </header>
  );
}