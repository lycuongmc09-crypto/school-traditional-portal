import React from "react";

interface AcademicSealProps {
  className?: string;
  size?: number;
  variant?: "full" | "shield" | "compact";
}

export default function AcademicSeal({ className = "", size = 64, variant = "full" }: AcademicSealProps) {
  const compact = variant !== "full";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Biểu trưng chữ H của Trường THPT Hoàng Văn Thụ" className={className}>
      <defs>
        <linearGradient id="school-mark" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3478b8"/><stop offset="1" stopColor="#14365e"/></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="white" stroke="#b9d4ee" strokeWidth="2"/>
      <circle cx="50" cy="50" r="41" fill="url(#school-mark)"/>
      <path d="M29 27h11v17h20V27h11v46H60V54H40v19H29z" fill="white"/>
      {!compact && <text x="50" y="87" textAnchor="middle" fill="#173B68" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" letterSpacing="1">HOÀNG VĂN THỤ</text>}
    </svg>
  );
}
