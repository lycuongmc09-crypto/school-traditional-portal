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
  title: "Phòng Truyền Thống & Di Sản Học Thuật - Trường THPT Chuyên Lê Quý Đôn",
  description: "Cổng số hóa không gian truyền thống, hiện vật lịch sử và sổ vàng lưu bút các thế hệ học sinh trường THPT Chuyên Lê Quý Đôn theo phong cách hàn lâm Harvard.",
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
