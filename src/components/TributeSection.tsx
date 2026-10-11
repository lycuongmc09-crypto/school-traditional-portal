import { BookOpen, MapPin, CalendarDays } from "lucide-react";
import Reveal from "./Reveal";

const lifeTimeline = [
  { date: "04/11/1909", text: "Sinh tại thôn Phạc Lạn, nay thuộc xã Hoàng Văn Thụ, huyện Văn Lãng, tỉnh Lạng Sơn; là người dân tộc Tày." },
  { date: "Cuối 1928 – 1929", text: "Tham gia Hội Việt Nam Cách mạng Thanh niên, sau đó được kết nạp vào Đông Dương Cộng sản Đảng." },
  { date: "08/09/1939", text: "Được cử làm Bí thư Xứ ủy Bắc Kỳ; cùng năm đến mỏ than Hà Lầm vận động, củng cố phong trào công nhân mỏ Quảng Ninh." },
  { date: "05/1941", text: "Được bầu vào Ban Thường vụ Trung ương Đảng, phụ trách công tác mặt trận và binh vận." },
  { date: "24/05/1944", text: "Hi sinh tại Tương Mai, Hà Nội, giữ vững khí tiết của người chiến sĩ cách mạng." },
];

export default function TributeSection() {
  return (
    <section id="tribute" className="border-b border-slate-200 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
        <Reveal className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-sky-800 p-8 text-white shadow-xl sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"/>
          <div className="absolute -right-7 -top-7 h-44 w-44 rounded-full border border-white/10"/>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[.16em] text-blue-100"><BookOpen className="h-4 w-4"/> Người chiến sĩ cách mạng</span>
          <h2 className="mt-7 font-display text-3xl font-bold leading-tight sm:text-4xl">Đồng chí<br/>Hoàng Văn Thụ</h2>
          <p className="mt-3 text-lg text-blue-100">04/11/1909 — 24/05/1944</p>
          <div className="my-7 h-px bg-white/20"/>
          <p className="text-sm leading-7 text-white/85">Người dân tộc Tày, sinh tại Lạng Sơn; nhà trường vinh dự mang tên người chiến sĩ cộng sản kiên trung, có đóng góp cho phong trào cách mạng và công nhân mỏ Quảng Ninh.</p>
          <p className="mt-6 inline-flex items-start gap-2 text-sm text-blue-100"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/> Tư liệu trích từ tài liệu lịch sử do giáo viên cung cấp.</p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mb-7">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800"><CalendarDays className="h-4 w-4"/> Tiểu sử tóm tắt</span>
            <h3 className="mt-3 font-display text-3xl font-bold text-slate-950">Một cuộc đời vì độc lập dân tộc</h3>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Những dấu mốc dưới đây được biên soạn từ tài liệu cô giáo gửi, giới thiệu hành trình hoạt động cách mạng và mối liên hệ của đồng chí với vùng mỏ Quảng Ninh.</p>
          </div>
          <ol className="relative space-y-0 border-l-2 border-blue-100 pl-6">
            {lifeTimeline.map((item, index) => <li key={item.date} className="relative pb-7 last:pb-0">
              <span className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-blue-700 ring-2 ring-blue-200"/>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">{item.date}</span>
              <p className="mt-1 text-sm leading-7 text-slate-700">{item.text}</p>
              {index === 2 && <p className="mt-2 rounded-lg border-l-4 border-sky-500 bg-sky-50 px-4 py-3 text-sm leading-6 text-slate-700">Tháng 9/1939, với bí danh Vân, đồng chí đến mỏ than Hà Lầm, góp phần động viên và củng cố phong trào công nhân mỏ.</p>}
            </li>)}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
