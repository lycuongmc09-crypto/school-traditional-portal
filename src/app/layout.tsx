import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trường THPT Hoàng Văn Thụ | Vàng Danh, Quảng Ninh",
  description: "Không gian tư liệu số về lịch sử, thành tích và các thế hệ thầy trò Trường THPT Hoàng Văn Thụ, Vàng Danh, Quảng Ninh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`scroll-smooth ${beVietnam.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1615] font-sans antialiased selection:bg-[#A51C30] selection:text-white">
        {children}
      </body>
    </html>
  );
}
