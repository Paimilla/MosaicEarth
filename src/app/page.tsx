"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PlanetaryViewer } from "@/components/PlanetaryViewer";
import { ComparisonSection } from "@/components/ComparisonSection";
import { MethodologySection } from "@/components/MethodologySection";
import { Footer } from "@/components/Footer";
import { CelestialBody } from "@/types/planetary";

export default function Home() {
  const [activePlanetaryTab, setActivePlanetaryTab] = useState<CelestialBody>("earth");
  const [currentSection, setCurrentSection] = useState<string>("maps");

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-space-950">
      {/* Header with integrated navigation */}
      <Header
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 space-y-2">
        {/* MOSAIC landing section */}
        <HeroSection
          onExploreClick={() => handleNavigate("maps")}
          onMethodologyClick={() => handleNavigate("methodology")}
        />

        {/* Planetary GIS Map Viewer with tile APIs and organized side panel */}
        <PlanetaryViewer
          activeTab={activePlanetaryTab}
          onSelectTab={setActivePlanetaryTab}
          onNavigateToComparison={(siteId) => {
            handleNavigate("comparison");
          }}
        />

        {/* Explore Comparison section */}
        <ComparisonSection />

        {/* Methodology and API Catalog section */}
        <MethodologySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
