import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Peraturan Direktur",
  description:
    "Cari peraturan direktur beserta riwayat perubahan dan status keberlakuannya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-[#EFF6FF] text-[#0F1F4D] antialiased [font-family:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
