import { Award, Clock, MapPin } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Over Taxi Rijnvallei</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Al meer dan 15 jaar uw betrouwbare vervoerspartner in de Rijnvallei regio. Wij kennen de regio als geen
                ander en bieden persoonlijke service met een lokale touch.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Onze ervaren chauffeurs zorgen voor veilig en comfortabel vervoer, of het nu gaat om een korte rit naar
                het station of een belangrijke luchthaven transfer. Met onze moderne vloot en lokale expertise bent u
                altijd verzekerd van kwaliteit.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Wij geloven in transparante prijzen, betrouwbare service en persoonlijke aandacht. Daarom kiezen zowel
                particulieren als bedrijven in de regio al jaren voor Taxi Rijnvallei.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Jaar ervaring</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Beschikbaar</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Lokaal</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/professional-taxi-driver-in-uniform-standing-next-.jpg"
                alt="Professionele chauffeur van Taxi Rijnvallei"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-secondary p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-foreground">5★</div>
                <div className="text-sm text-secondary-foreground/80">Klantbeoordeling</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
