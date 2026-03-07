import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import TrustSection from "@/components/trust-section"
import ServicesSection from "@/components/services-section"
import AirportSection from "@/components/airport-section"
import LocalSection from "@/components/local-section"
import BusinessSection from "@/components/business-section"
import RatesSection from "@/components/rates-section"
import ContactSection from "@/components/contact-section"
import FaqSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"
import ClosingSection from "@/components/closing-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <AirportSection />
        <RatesSection />
        <LocalSection />
        <BusinessSection />
        <FaqSection />
        <ContactSection />
        {/* <CtaSection /> */}
        <ClosingSection />
      </main>
      <Footer />
    </div>
  )
}
