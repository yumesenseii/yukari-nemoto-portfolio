import { FeaturedProjectsCarousel } from "@/components/featured-projects-carousel";
import { FinalCta } from "@/components/final-cta";
import { HeroSection } from "@/components/hero-section";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 3, 4, 5, 6: Hero Section, Layered Parallax Composition, Intro Modal & Opportunities Status */}
      <HeroSection />

      {/* 7, 8: Featured Projects Section & Responsive Carousel */}
      <FeaturedProjectsCarousel />

      {/* 9: Final Call to Action */}
      <FinalCta />
    </div>
  );
}
