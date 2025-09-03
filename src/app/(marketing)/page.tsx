import Image from "next/image";
import { HeroSection } from "./components/HeroSection";
import { LogosMarquee } from "./components/LogosMarquee";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorks } from "./components/HowItWorks";
import { ScreenshotsSection } from "./components/ScreenshotsSection";
import { SocialProof } from "./components/SocialProof";
import { FAQ } from "./components/FAQ";
import { CallToAction } from "./components/CallToAction";

export default function MarketingPage() {
  return (
    <>
      <HeroSection />
      <div className="container flex flex-col items-center text-center py-10">
        <Image
          src="/Runbook.png"
          alt="Futuristic notebook"
          width={500}
          height={500}
        />
        <h1 className="mt-6 text-3xl font-bold">
          Get started with Runbook today!
        </h1>
      </div>
      <LogosMarquee />
      <FeaturesSection />
      <HowItWorks />
      <ScreenshotsSection />
      <SocialProof />
      <FAQ />
      <CallToAction />
    </>
  );
}
