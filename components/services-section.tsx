import { MapPin, Plane, Building2, Hospital, Train, Car } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Car,
    title: "Particulier vervoer",
    description: "Vervoer voor korte en langere ritten. Van boodschappen tot een dagje uit.",
  },
  {
    icon: Building2,
    title: "Zakelijk vervoer",
    description: "Professioneel vervoer voor bedrijven. Facturatie achteraf mogelijk.",
  },
  {
    icon: Plane,
    title: "Luchthavenvervoer",
    description: "Vaste tarieven naar Schiphol, Eindhoven, Rotterdam en andere luchthavens.",
  },
  {
    icon: Train,
    title: "Stationsvervoer",
    description: "Van en naar stations in de regio. Altijd op tijd voor uw trein.",
  },
  {
    icon: Hospital,
    title: "Ziekenhuisvervoer",
    description: "Vervoer naar ziekenhuizen en afspraken. Rustig en op tijd.",
  },
  {
    icon: MapPin,
    title: "WUR vervoer",
    description: "Vervoer van en naar Wageningen Universiteit voor medewerkers en gasten.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Onze diensten</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Taxi Rijnvallei biedt vervoer voor particulieren en bedrijven. Hieronder een overzicht van onze diensten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
