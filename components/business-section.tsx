import { Building2, FileText, Users, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const businessServices = [
  {
    icon: Building2,
    title: "Zakelijk vervoer",
    description: "Professioneel vervoer voor bedrijven en instellingen. Facturatie achteraf mogelijk.",
  },
  {
    icon: FileText,
    title: "Facturatie op maat",
    description: "Maandelijkse factuur met ritoverzicht. Geschikt voor bedrijven met regelmatig vervoer.",
  },
  {
    icon: GraduationCap,
    title: "WUR vervoer",
    description: "Vervoer van en naar Wageningen Universiteit. Voor medewerkers, gasten en studenten.",
  },
  {
    icon: Users,
    title: "Groepsvervoer",
    description: "Grotere groepen tot 8 personen. Ideaal voor zakelijke bijeenkomsten en evenementen.",
  },
]

export default function BusinessSection() {
  return (
    <section id="business" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Zakelijk vervoer</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Taxi Rijnvallei werkt samen met bedrijven en instellingen in de regio. Facturatie en vaste afspraken zijn mogelijk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {businessServices.map((service, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground">
            Neem contact met ons op voor de mogelijkheden voor uw bedrijf of instelling.
          </p>
        </div>
      </div>
    </section>
  )
}
