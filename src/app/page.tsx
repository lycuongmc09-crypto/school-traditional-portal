import { getDatabase } from "@/lib/db";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import TeachersSection from "@/components/TeachersSection";
import Footer from "@/components/Footer";
import MediaSection from "@/components/MediaSection";
import TributeSection from "@/components/TributeSection";

export default async function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <MediaSection media={db.media} />
        <TimelineSection milestones={db.milestones} />
        <TributeSection />
        <TeachersSection teachers={db.teachers} />
      </main>
      <Footer />
    </div>
  );
}
