import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookingWidget } from "@/components/booking"
import { Phone, MessageCircle, ShieldCheck, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessSection from "@/components/business-section"
import LocalSection from "@/components/local-section"
import RatesSection from "@/components/rates-section"
import AirportSection from "@/components/airport-section"
import ServicesSection from "@/components/services-section"
import TrustSection from "@/components/trust-section"

function slugToTitle(slug: string): string {
        return slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
}

interface SlugPageProps {
        params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
        const { slug } = await params
        const title = slugToTitle(slug)

        return {
                title,
                description: `${title} – Taxi Rijnvallei: betrouwbare taxiservice in de Rijnvallei. 24/7 bereikbaar. Bel 0317-844466.`,
                alternates: {
                        canonical: `https://taxirijnvallei.nl/${slug}`,
                },
        }
}

export default async function SlugPage({ params }: SlugPageProps) {
        const { slug } = await params
        const title = slugToTitle(slug)

        return (
                <div className="min-h-screen bg-background">
                        <Header />
                        <main>
                                {/* Hero */}
                                <section className="relative bg-linear-to-br from-primary/5 to-secondary/5 py-12 lg:py-20">
                                        <div className="container mx-auto px-4">
                                                <div className="max-w-3xl mx-auto text-center space-y-6">
                                                        <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight capitalize">
                                                                {title}
                                                        </h1>
                                                        <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                                                                Betrouwbaar vervoer door Taxi Rijnvallei. Altijd op tijd, vaste tarieven en
                                                                professionele chauffeurs. 24 uur per dag bereikbaar.
                                                        </p>

                                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                                                        <a href="tel:+31317844466">
                                                                                <Phone className="w-5 h-5 mr-2" />
                                                                                Bel 0317-844466
                                                                        </a>
                                                                </Button>
                                                                <Button
                                                                        size="lg"
                                                                        variant="outline"
                                                                        className="border-primary text-primary hover:bg-primary/10"
                                                                        asChild
                                                                >
                                                                        <a href="https://wa.me/31647145342" target="_blank" rel="noopener noreferrer">
                                                                                <MessageCircle className="w-5 h-5 mr-2" />
                                                                                WhatsApp
                                                                        </a>
                                                                </Button>

                                                        </div>
                                                        <Button size="lg" variant="default" className="bg-sky-600 text-white hover:bg-sky-700 w-1/2" asChild>
                                                                <a href="#contact">RESERVEER DIRECT</a>
                                                        </Button>
                                                </div>
                                        </div>
                                </section>

                                {/* Closing */}
                                <section className="py-16 mb-6">
                                        <div className="container mx-auto px-4">
                                                <div className="max-w-3xl mx-auto text-center">
                                                        <h2 className="text-2xl font-bold mb-4">Taxi Rijnvallei</h2>
                                                        <p className="text-muted-foreground mb-8 text-pretty">
                                                                Uw lokale taxidienst in Ede en omgeving. Betrouwbaar, bereikbaar en met transparante
                                                                tarieven. Wij staan dag en nacht voor u klaar.
                                                        </p>

                                                        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                                                                <div className="flex items-center gap-2">
                                                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                                                        <span>Betrouwbaar vervoer</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                        <Clock className="w-4 h-4 text-primary" />
                                                                        <span>24/7 bereikbaar</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                        <MapPin className="w-4 h-4 text-primary" />
                                                                        <span>Lokale expertise</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </section>

                                <TrustSection />
                                <ServicesSection />
                                <AirportSection />
                                <RatesSection />
                                <LocalSection />
                                <BusinessSection />

                        </main>
                        <Footer />
                </div>
        )
}
