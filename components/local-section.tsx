import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { findLocationByName } from '@/lib/config/locations'

const primaryAreas = ['Ede', 'Wageningen', 'Bennekom', 'Veenendaal', 'Lunteren', 'Barneveld']
const secondaryAreas = ['Rhenen', 'Renkum', 'Doorwerth', 'Oosterbeek', 'Harskamp', 'Otterlo', 'Woudenberg', 'Scherpenzeel']

function AreaChip({ name, primary }: { name: string; primary: boolean }) {
  const location = findLocationByName(name)
  const className = primary
    ? 'rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'
    : 'rounded-full bg-muted px-3 py-1 text-sm'

  return location ? (
    <Link href={`/${location.slug}`} className={`${className} transition-colors hover:bg-primary hover:text-primary-foreground`}>
      Taxi {name}
    </Link>
  ) : (
    <span className={className}>{name}</span>
  )
}

export default function LocalSection() {
  return (
    <section id="local" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-balance lg:text-4xl">Lokaal en regionaal vervoer</h2>
              <p className="text-xl leading-relaxed text-pretty text-muted-foreground">
                Taxi Rijnvallei is actief in Ede, Wageningen en de wijde omgeving. Wij kennen de regio en
                brengen u snel en veilig op uw bestemming.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Primair werkgebied</h3>
              <div className="flex flex-wrap gap-2">
                {primaryAreas.map((area) => (
                  <AreaChip key={area} name={area} primary />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Daarnaast actief in</h3>
              <div className="flex flex-wrap gap-2">
                {secondaryAreas.map((area) => (
                  <AreaChip key={area} name={area} primary={false} />
                ))}
              </div>
            </div>

            <p className="text-muted-foreground">
              Woont u in een andere plaats? Neem contact met ons op. Wij rijden door de hele regio en
              daarbuiten.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.5%2C51.9%2C5.8%2C52.05&layer=mapnik&marker=51.9692%2C5.6654"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kaart van het werkgebied van Taxi Rijnvallei rond Ede en Wageningen"
              />
            </div>
            <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-card/95 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <MapPin className="size-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Ede, Wageningen en omgeving</p>
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
