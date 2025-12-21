import { MapPin } from "lucide-react"

const primaryAreas = ["Wageningen", "Ede", "Veenendaal", "Bennekom", "Barneveld"]
const secondaryAreas = ["Rhenen", "Renkum", "Doorwerth", "Harskamp", "Lunteren", "Woudenberg", "Scherpenzeel"]

export default function LocalSection() {
  return (
    <section id="local" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Lokaal en regionaal vervoer</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Taxi Rijnvallei is actief in Wageningen en de wijde omgeving. Wij kennen de regio en brengen u snel en veilig op uw bestemming.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Primair werkgebied</h3>
              <div className="flex flex-wrap gap-2">
                {primaryAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Daarnaast actief in</h3>
              <div className="flex flex-wrap gap-2">
                {secondaryAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground">
              Woont u in een andere plaats? Neem contact met ons op. Wij rijden door de hele regio en daarbuiten.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.5%2C51.9%2C5.8%2C52.05&layer=mapnik&marker=51.9692%2C5.6654"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Taxi Rijnvallei - Wageningen en omgeving"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold">Wageningen en omgeving</h3>
                  <p className="text-sm text-muted-foreground">Vertrouwd met alle routes in de Rijnvallei</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
