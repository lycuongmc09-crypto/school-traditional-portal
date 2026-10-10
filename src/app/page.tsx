import { getDatabase } from "@/lib/db";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import ArtifactsGallery from "@/components/ArtifactsGallery";
import TeachersSection from "@/components/TeachersSection";
import GuestbookSection from "@/components/GuestbookSection";
import ContributeSection from "@/components/ContributeSection";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const db = getDatabase();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TimelineSection milestones={db.milestones} />
        <ArtifactsGallery initialArtifacts={db.artifacts} />
        <TeachersSection teachers={db.teachers} />
        <GuestbookSection initialEntries={db.guestbook} />
        <ContributeSection />
      </main>
      <Footer />
    </div>
  );
}
