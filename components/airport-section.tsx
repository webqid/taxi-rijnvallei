import { Plane, Clock, CheckCircle, Euro, Phone, MapPin, Briefcase, Smile } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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

const pickupSteps = [
  {
    step: 1,
    title: "Telefoon aan na landing",
    description: "Zet uw telefoon aan zodra u geland bent",
  },
  {
    step: 2,
    title: "Chauffeur belt u",
    description: "Ongeveer 10 minuten na de landing belt de chauffeur u en geeft de precieze ophaallocatie aan",
  },
  {
    step: 3,
    title: "Ophalen bij vertrekhal",
    description: "Uw taxi haalt u op bij VERTREKHAL 1, 2 of 3 op de 2e verdieping (LET OP! Dus NIET bij de aankomsthallen!)",
  },
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
            <div className="relative aspect-[4/3] mb-6 rounded-xl overflow-hidden">
              <Image
                src="/goedkope-schiphol-taxi-320x240.jpg"
                alt="Schiphol taxi - ontspannen reizen naar de luchthaven"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-6">Tarieven vanaf Veenendaal, Ede, Bennekom en Wageningen</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {airports.map((airport, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Plane className="w-5 h-5 text-primary" />
                      <span className="font-medium">{airport.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground ml-8">
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

        {/* Ophalen op Schiphol - Stappen */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Hoe vind ik mijn taxi bij aankomst op Schiphol?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pickupSteps.map((item) => (
              <Card key={item.step} className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Indien nodig kunt u de chauffeur bereiken op{" "}
            <a href="tel:0647145342" className="text-primary font-medium hover:underline">
              06-47 14 53 42
            </a>
          </p>
        </div>

        {/* Extra service informatie */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            Altijd op tijd voor uw vlucht
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Een ontspannen begin van uw vakantie of zakenreis
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Altijd stipt op tijd</h4>
              <p className="text-sm text-muted-foreground">Uw taxi is altijd op tijd op het afgesproken adres</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Bagage service</h4>
              <p className="text-sm text-muted-foreground">Chauffeur draagt uw bagage, ook van bovenverdiepingen</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Smile className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Hulp bij instappen</h4>
              <p className="text-sm text-muted-foreground">Hulp nodig met in- en uitstappen? Wij helpen u graag</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Juiste vertrekhal</h4>
              <p className="text-sm text-muted-foreground">Wij zetten u af bij de juiste vertrekhal</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm max-w-2xl mx-auto">
            Onze taxi's zijn uitgerust met airconditioning. Onderweg kunt u heerlijk ontspannen of, als u op zakenreis gaat, aan uw zaken werken.
          </p>
        </div>
      </div>
    </section>
  )
}
