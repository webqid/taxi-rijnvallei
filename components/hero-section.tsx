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
                Taxi Rijnvallei –<span className="text-primary"> Betrouwbaar vervoer</span> in uw regio
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Professioneel taxivervoer voor inwoners van Renkum, Wageningen, Oosterbeek en Arnhem. 24/7 beschikbaar
                voor al uw vervoersbehoeften.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Phone className="w-5 h-5 mr-2" />
                Bel Nu: 0317-123456
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary-foreground hover:bg-secondary/10 bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>24/7 beschikbaar</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Lokale expertise</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Vaste prijzen</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/modern-taxi-car-in-dutch-countryside-with-rijnvall.jpg"
                alt="Taxi Rijnvallei in de regio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Direct beschikbaar</p>
                  <p className="text-sm text-muted-foreground">Gemiddelde wachttijd: 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
