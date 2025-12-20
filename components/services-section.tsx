import { MapPin, Plane, Building2, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: MapPin,
    title: "Lokale ritten",
    description: "Vervoer binnen Renkum, Wageningen, Oosterbeek en Arnhem. Ideaal voor dagelijkse verplaatsingen.",
    features: ["Korte wachttijden", "Lokale kennis", "Vaste chauffeurs"],
  },
  {
    icon: Plane,
    title: "Luchthaven transfers",
    description: "Comfortabel vervoer naar Schiphol, Eindhoven en Düsseldorf. Altijd op tijd voor uw vlucht.",
    features: ["Flight tracking", "Vaste prijzen", "Ruime voertuigen"],
  },
  {
    icon: Building2,
    title: "Zakelijke ritten",
    description: "Professioneel vervoer voor zakelijke afspraken. Discrete en betrouwbare service.",
    features: ["Factuurservice", "Vaste chauffeurs", "Premium voertuigen"],
  },
  {
    icon: Users,
    title: "Groepsvervoer",
    description: "Vervoer voor grotere groepen tot 8 personen. Perfect voor evenementen en uitjes.",
    features: ["Grote voertuigen", "Groepstarieven", "Flexibele planning"],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Onze diensten</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Van lokale ritten tot luchthaven transfers – wij bieden betrouwbaar vervoer voor elke gelegenheid.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
