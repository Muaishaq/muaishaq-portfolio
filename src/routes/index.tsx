import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { Ticker } from "@/components/portfolio/Ticker";
import { CvModal } from "@/components/portfolio/CvModal";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { HeroBento, StackAndSecurity, CredentialsDock, ContactFooter } from "@/components/portfolio/Sections";
import { PortfolioChat } from "@/components/portfolio/PortfolioChat";
import { tickerItems } from "@/data/portfolio";

const TITLE = "Muhammed Ishaq — Secure AI/ML & Full-Stack Engineer";
const DESCRIPTION =
  "Portfolio of Muhammed Ishaq: secure, scalable full-stack systems and production machine learning. Builder of TechTrust AI, FUDMA CS graduate (CGPA 4.39).";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cvOpen, setCvOpen] = useState(false);
  const openCv = () => setCvOpen(true);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <SiteHeader onOpenCv={openCv} />
        <Ticker items={tickerItems} />
      </header>
      <main>
        <HeroBento onOpenCv={openCv} />
        <ProjectShowcase />
        <StackAndSecurity />
        <CredentialsDock />
      </main>
      <ContactFooter />
      <CvModal open={cvOpen} onOpenChange={setCvOpen} />
      <PortfolioChat />
    </div>
  );
}
