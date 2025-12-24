"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plane, Clock, CreditCard, Euro, Users, Car, MapPin } from "lucide-react"

const taximeterRates = {
  standaard: {
    capaciteit: "1-4 personen",
    instaptarief: 4.15,
    prijsPerKilometer: 3.05,
    prijsPerMinuut: 0.50,
  },
  groot: {
    capaciteit: "5-8 personen",
    instaptarief: 8.44,
    prijsPerKilometer: 3.85,
    prijsPerMinuut: 0.57,
  },
  wachttariefPerUur: 57.20,
}

const luchthavenTarieven = [
  {
    vertrekgebied: "Veenendaal, Ede, Bennekom en Wageningen",
    bestemmingen: [
      { naam: "Schiphol", wegbrengen: 150, ophalen: 160, retour: 300 },
      { naam: "Weeze Airport", enkeleReis: 150, retour: 300 },
      { naam: "Eindhoven Airport", enkeleReis: 150, retour: 300 },
      { naam: "Rotterdam Airport", enkeleReis: 160, retour: 320 },
      { naam: "Maastricht Aachen Airport", wegbrengen: 260, ophalen: 280, retour: 520 },
      { naam: "Brussels Airport", wegbrengen: 260, ophalen: 280, retour: 520 },
    ],
  },
  {
    vertrekgebied: "Barneveld, Voorthuizen, Lunteren, Renswoude, Woudenberg en Scherpenzeel",
    bestemmingen: [
      { naam: "Schiphol", wegbrengen: 160, ophalen: 170, retour: 320 },
      { naam: "Rotterdam Airport", enkeleReis: 160, retour: 320 },
      { naam: "Weeze Airport", enkeleReis: 160, retour: 320 },
      { naam: "Eindhoven Airport", enkeleReis: 170, retour: 340 },
      { naam: "Maastricht Aachen Airport", wegbrengen: 270, ophalen: 290, retour: 540 },
      { naam: "Brussels Airport", wegbrengen: 270, ophalen: 290, retour: 540 },
    ],
  },
  {
    vertrekgebied: "Rhenen, Renkum en Doorwerth",
    bestemmingen: [{ naam: "Schiphol", wegbrengen: 160, ophalen: 170, retour: 320 }],
  },
  {
    vertrekgebied: "Oosterbeek",
    bestemmingen: [{ naam: "Schiphol", wegbrengen: 170, ophalen: 180, retour: 340 }],
  },
  {
    vertrekgebied: "Otterlo, Harskamp, Wekerom en Kootwijkerbroek",
    bestemmingen: [{ naam: "Schiphol", wegbrengen: 170, ophalen: 180, retour: 340 }],
  },
  {
    vertrekgebied: "Kesteren",
    bestemmingen: [{ naam: "Schiphol", wegbrengen: 160, ophalen: 170, retour: 320 }],
  },
  {
    vertrekgebied: "Druten",
    bestemmingen: [{ naam: "Schiphol", wegbrengen: 170, ophalen: 180, retour: 340 }],
  },
]

const betaalmethoden = ["Pinbetaling", "Contant", "Creditcard", "Factuur (bedrijven en instellingen)"]

export default function RatesSection() {
  return (
    <section id="rates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Tarieven</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transparante prijzen, vooraf bekend. Alle tarieven zijn inclusief 9% btw.
          </p>
        </div>

        {/* Taximeter tarieven */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="w-5 h-5 text-primary" />
                Standaard taxi
              </CardTitle>
              <p className="text-sm text-muted-foreground">{taximeterRates.standaard.capaciteit}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instaptarief</span>
                <span className="font-semibold">€{taximeterRates.standaard.instaptarief.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per kilometer</span>
                <span className="font-semibold">€{taximeterRates.standaard.prijsPerKilometer.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per minuut</span>
                <span className="font-semibold">€{taximeterRates.standaard.prijsPerMinuut.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-primary" />
                Grote taxi
              </CardTitle>
              <p className="text-sm text-muted-foreground">{taximeterRates.groot.capaciteit}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instaptarief</span>
                <span className="font-semibold">€{taximeterRates.groot.instaptarief.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per kilometer</span>
                <span className="font-semibold">€{taximeterRates.groot.prijsPerKilometer.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per minuut</span>
                <span className="font-semibold">€{taximeterRates.groot.prijsPerMinuut.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Wachttarief
              </CardTitle>
              <p className="text-sm text-muted-foreground">Wanneer u de taxi laat wachten</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per uur</span>
                <span className="font-semibold">€{taximeterRates.wachttariefPerUur.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Bij luchthaven ophalen: 45 min gratis, daarna €13,84 per 15 min
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Luchthaven tarieven met accordion */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
            <Plane className="w-6 h-6 text-primary" />
            Luchthaven tarieven
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            Vaste prijzen per vertrekgebied. Klik op uw regio voor de tarieven.<br />
            Alleen geldig bij reservering minimaal 24 uur van te voren.
          </p>

          <Card className="border-0 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {luchthavenTarieven.map((gebied, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0">
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>{gebied.vertrekgebied}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Bestemming</th>
                              <th className="text-right py-2 font-medium">Wegbrengen</th>
                              <th className="text-right py-2 font-medium">Ophalen</th>
                              <th className="text-right py-2 font-medium">Retour</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gebied.bestemmingen.map((bestemming, bIndex) => (
                              <tr key={bIndex} className="border-b last:border-0">
                                <td className="py-2">{bestemming.naam}</td>
                                <td className="text-right py-2">
                                  €{bestemming.wegbrengen ?? bestemming.enkeleReis}
                                </td>
                                <td className="text-right py-2">
                                  €{bestemming.ophalen ?? bestemming.enkeleReis}
                                </td>
                                <td className="text-right py-2 font-semibold">€{bestemming.retour}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Prijzen gelden voor 1–4 personen. Grote taxi (5–8 personen) op aanvraag.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-2">LET OP!</p>
            <p>
              Prijzen kunnen afwijken van de hier genoemde bedragen. Bijvoorbeeld zaterdag- en zondagochtend tussen 1 en 5 uur gelden hogere tarieven. Vraag naar de voor uw reis geldende prijs. Prijzen zijn incl. 9% BTW en per taxi tot max. 4 personen. Alleen geldig bij reservering minimaal 24 uur van te voren. Voor overige bestemmingen neemt u alstublieft contact met ons op voor een vrijblijvende offerte. Stuur een bericht of bel{" "}
              <a href="tel:0647145342" className="font-semibold underline hover:no-underline">
                06-47 14 53 42
              </a>.
            </p>
          </div>
        </div>

        {/* Betaalmethoden en opmerkingen */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Betaalmethoden
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {betaalmethoden.map((methode, index) => (
                <span
                  key={index}
                  className="bg-card border px-4 py-2 rounded-full text-sm flex items-center gap-2"
                >
                  <Euro className="w-3 h-3 text-primary" />
                  {methode}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Alle prijzen zijn inclusief 9% btw</p>
            <p>Nacht- en weekendtarieven kunnen afwijken</p>
            <p>Reserveren minimaal 24 uur van tevoren wordt aanbevolen</p>
          </div>
        </div>
      </div>
    </section>
  )
}
