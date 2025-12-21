import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Taxi Rijnvallei
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Betrouwbaar vervoer in Wageningen en omgeving. Altijd op tijd, vaste tarieven en professionele chauffeurs. 24 uur per dag bereikbaar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/modern-taxi-car-in-dutch-countryside-with-rijnvall.jpg"
                alt="Taxi Rijnvallei"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
