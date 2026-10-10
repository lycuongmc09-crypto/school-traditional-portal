import React from "react";

interface AcademicSealProps {
  className?: string;
  size?: number;
  variant?: "full" | "shield" | "compact";
}

export default function AcademicSeal({
  className = "",
  size = 64,
  variant = "full",
}: AcademicSealProps) {
  if (variant === "shield") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-md ${className}`}
      >
        {/* Shield Outer Gold Rim */}
        <path
          d="M50 4C78 4 94 18 94 45C94 78 64 103 50 111C36 103 6 78 6 45C6 18 22 4 50 4Z"
          fill="#A51C30"
          stroke="#C29B38"
          strokeWidth="3.5"
        />
        {/* Inner Shield Inset */}
        <path
          d="M50 9C74 9 89 21 89 45C89 74 62 97 50 104C38 97 11 74 11 45C11 21 26 9 50 9Z"
          fill="#801424"
          stroke="#DFB15B"
          strokeWidth="1.2"
          strokeDasharray="2 1"
        />
        {/* Book 1 (Top Left) */}
        <g transform="translate(23, 24)">
          <rect x="0" y="0" width="22" height="17" rx="1.5" fill="#FAF7F2" stroke="#C29B38" strokeWidth="1.2" />
          <line x1="11" y1="0" x2="11" y2="17" stroke="#C29B38" strokeWidth="1" />
          <text x="5.5" y="11" fill="#4E0A14" fontSize="7" fontWeight="bold" fontFamily="serif" textAnchor="middle">VE</text>
          <text x="16.5" y="11" fill="#4E0A14" fontSize="7" fontWeight="bold" fontFamily="serif" textAnchor="middle">RI</text>
        </g>
        {/* Book 2 (Top Right) */}
        <g transform="translate(55, 24)">
          <rect x="0" y="0" width="22" height="17" rx="1.5" fill="#FAF7F2" stroke="#C29B38" strokeWidth="1.2" />
          <line x1="11" y1="0" x2="11" y2="17" stroke="#C29B38" strokeWidth="1" />
          <text x="5.5" y="11" fill="#4E0A14" fontSize="7" fontWeight="bold" fontFamily="serif" textAnchor="middle">TA</text>
          <text x="16.5" y="11" fill="#4E0A14" fontSize="7" fontWeight="bold" fontFamily="serif" textAnchor="middle">S</text>
        </g>
        {/* Book 3 (Bottom Center) */}
        <g transform="translate(39, 52)">
          <rect x="0" y="0" width="22" height="17" rx="1.5" fill="#FAF7F2" stroke="#C29B38" strokeWidth="1.2" />
          <line x1="11" y1="0" x2="11" y2="17" stroke="#C29B38" strokeWidth="1" />
          <text x="5.5" y="11" fill="#4E0A14" fontSize="6.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">LQ</text>
          <text x="16.5" y="11" fill="#4E0A14" fontSize="6.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">Đ</text>
        </g>
        {/* Bottom Star & Laurel */}
        <circle cx="50" cy="84" r="3" fill="#DFB15B" />
        <path d="M42 84 C 45 88, 55 88, 58 84" stroke="#DFB15B" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg ${className}`}
    >
      {/* Outer Beaded Border */}
      <circle cx="80" cy="80" r="76" stroke="#C29B38" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="80" cy="80" r="72" stroke="#C29B38" strokeWidth="2.5" />
      
      {/* Ribbon Fill Ring */}
      <circle cx="80" cy="80" r="62" fill="#4E0A14" stroke="#C29B38" strokeWidth="1.5" />

      {/* Circular Text Path for Motto */}
      <defs>
        <path id="seal-circle-top" d="M 24,80 A 56,56 0 1,1 136,80" />
        <path id="seal-circle-bottom" d="M 136,80 A 56,56 0 0,1 24,80" />
      </defs>

      <text fill="#DFB15B" fontSize="9" fontWeight="700" fontFamily="serif" letterSpacing="2.5px">
        <textPath href="#seal-circle-top" startOffset="50%" textAnchor="middle">
          THPT CHUYÊN LÊ QUÝ ĐÔN
        </textPath>
      </text>

      <text fill="#DFB15B" fontSize="8" fontWeight="600" fontFamily="serif" letterSpacing="2px">
        <textPath href="#seal-circle-bottom" startOffset="50%" textAnchor="middle">
          ★ 1956 • VERITAS ET SCIENTIA ★
        </textPath>
      </text>

      {/* Inner Crimson Medallion */}
      <circle cx="80" cy="80" r="44" fill="#801424" stroke="#C29B38" strokeWidth="2" />
      <circle cx="80" cy="80" r="41" stroke="#DFB15B" strokeWidth="0.75" strokeDasharray="2 2" />

      {/* Central Shield */}
      <path
        d="M80 47C96 47 106 55 106 72C106 92 88 107 80 113C72 107 54 92 54 72C54 55 64 47 80 47Z"
        fill="#A51C30"
        stroke="#C29B38"
        strokeWidth="2"
      />

      {/* Book 1 (Top Left) */}
      <g transform="translate(62, 59)">
        <rect x="0" y="0" width="16" height="12" rx="1" fill="#FAF7F2" stroke="#C29B38" strokeWidth="0.9" />
        <line x1="8" y1="0" x2="8" y2="12" stroke="#C29B38" strokeWidth="0.8" />
        <text x="4" y="8" fill="#4E0A14" fontSize="5" fontWeight="bold" fontFamily="serif" textAnchor="middle">VE</text>
        <text x="12" y="8" fill="#4E0A14" fontSize="5" fontWeight="bold" fontFamily="serif" textAnchor="middle">RI</text>
      </g>

      {/* Book 2 (Top Right) */}
      <g transform="translate(82, 59)">
        <rect x="0" y="0" width="16" height="12" rx="1" fill="#FAF7F2" stroke="#C29B38" strokeWidth="0.9" />
        <line x1="8" y1="0" x2="8" y2="12" stroke="#C29B38" strokeWidth="0.8" />
        <text x="4" y="8" fill="#4E0A14" fontSize="5" fontWeight="bold" fontFamily="serif" textAnchor="middle">TA</text>
        <text x="12" y="8" fill="#4E0A14" fontSize="5" fontWeight="bold" fontFamily="serif" textAnchor="middle">S</text>
      </g>

      {/* Book 3 (Bottom Center) */}
      <g transform="translate(72, 77)">
        <rect x="0" y="0" width="16" height="12" rx="1" fill="#FAF7F2" stroke="#C29B38" strokeWidth="0.9" />
        <line x1="8" y1="0" x2="8" y2="12" stroke="#C29B38" strokeWidth="0.8" />
        <text x="4" y="8" fill="#4E0A14" fontSize="4.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">LQ</text>
        <text x="12" y="8" fill="#4E0A14" fontSize="4.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">Đ</text>
      </g>

      {/* Laurel Sprigs */}
      <path
        d="M50 78 Q 47 94 56 104"
        stroke="#C29B38"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M110 78 Q 113 94 104 104"
        stroke="#C29B38"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}
