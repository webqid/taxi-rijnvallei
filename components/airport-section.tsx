import { Plane, Clock, CheckCircle, Euro } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const airports = [
  { name: "Schiphol", wegbrengen: 150, ophalen: 160 },
  { name: "Eindhoven Airport", enkeleReis: 150 },
  { name: "Rotterdam Airport", enkeleReis: 160 },
  { name: "Weeze Airport", enkeleReis: 150 },
  { name: "Brussels Airport", wegbrengen: 260, ophalen: 280 },
  { name: "Maastricht Aachen Airport", wegbrengen: 260, ophalen: 280 },
]

const benefits = [
  "Vaste tarieven per regio",
  "45 minuten gratis wachttijd bij ophalen",
  "Geen extra kosten bij vertraagde vlucht",
  "Wachttijd daarna: €13,84 per 15 minuten",
]

export default function AirportSection() {
  return (
    <section id="airport" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plane className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Luchthavenvervoer</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ontspannen naar de luchthaven of weer thuis. Wij zorgen dat u op tijd bent, zonder stress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-semibold mb-6">Tarieven vanaf Veenendaal, Ede, Bennekom en Wageningen</h3>
            <div className="space-y-3">
              {airports.map((airport, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <Plane className="w-5 h-5 text-primary" />
                        <span className="font-medium">{airport.name}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground ml-8">
                      {airport.enkeleReis ? (
                        <span>Enkele reis: <span className="text-foreground font-semibold">€{airport.enkeleReis}</span></span>
                      ) : (
                        <>
                          <span>Wegbrengen: <span className="text-foreground font-semibold">€{airport.wegbrengen}</span></span>
                          <span>Ophalen: <span className="text-foreground font-semibold">€{airport.ophalen}</span></span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Prijzen zijn inclusief 9% btw en gelden voor 1–4 personen. Bekijk alle regio's en tarieven hieronder.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Ophaalservice luchthaven</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Card className="border-0 shadow-sm mt-8 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Gratis wachttijd</h4>
                    <p className="text-muted-foreground text-sm">
                      Bij het ophalen wachten wij 45 minuten gratis. Is uw vlucht vertraagd? Geen probleem, wij volgen uw vlucht en passen onze aankomsttijd aan. Geen extra kosten bij vertraging.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm mt-4">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Euro className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Grote taxi (5–8 personen)</h4>
                    <p className="text-muted-foreground text-sm">
                      Voor groepen tot 8 personen zijn afwijkende tarieven van toepassing. Neem contact op voor een offerte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
