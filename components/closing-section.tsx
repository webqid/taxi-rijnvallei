import { ShieldCheck, Clock, MapPin } from "lucide-react"

export default function ClosingSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Taxi Rijnvallei</h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Uw lokale taxidienst in Wageningen en omgeving. Betrouwbaar, bereikbaar en met transparante tarieven. Wij staan dag en nacht voor u klaar.
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
  )
}
