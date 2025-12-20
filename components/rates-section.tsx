import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plane, Clock } from "lucide-react"

const rateExamples = [
  {
    icon: MapPin,
    route: "Wageningen → Arnhem Centraal",
    price: "€25",
    duration: "20 min",
  },
  {
    icon: MapPin,
    route: "Renkum → Oosterbeek",
    price: "€15",
    duration: "10 min",
  },
  {
    icon: Plane,
    route: "Regio → Schiphol",
    price: "€85",
    duration: "60 min",
  },
]

export default function RatesSection() {
  return (
    <section id="rates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Transparante tarieven</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Geen verrassingen achteraf. Onze prijzen zijn vooraf bekend en inclusief alle kosten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {rateExamples.map((rate, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <rate.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{rate.route}</h3>
                <div className="text-2xl font-bold text-primary mb-1">{rate.price}</div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {rate.duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="bg-card p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Wilt u een exacte prijsopgave?</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Bel ons voor een persoonlijke offerte op maat. Wij berekenen de beste prijs voor uw specifieke rit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Vraag offerte aan
              </Button>
              <Button size="lg" variant="outline">
                Bekijk alle tarieven
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Geen opstaptoeslag</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Inclusief BTW</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Vaste prijzen</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Pin & contant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
