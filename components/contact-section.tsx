import { Phone, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Contact & Reservering</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Neem contact met ons op voor uw reservering of vragen. Wij staan 24/7 voor u klaar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Telefonisch reserveren</h3>
                      <p className="text-muted-foreground mb-3">Direct contact met onze centrale</p>
                      <a
                        href="tel:+31317123456"
                        className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        0317-123456
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-3">Snel en gemakkelijk reserveren</p>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Start WhatsApp chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Openingstijden</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Telefonische service: 24/7</p>
                        <p>WhatsApp: 06:00 - 24:00</p>
                        <p>Kantoor: Ma-Vr 08:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Stuur ons een bericht</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Naam</label>
                      <Input placeholder="Uw naam" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Telefoon</label>
                      <Input placeholder="Uw telefoonnummer" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">E-mail</label>
                    <Input type="email" placeholder="uw.email@example.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Van</label>
                      <Input placeholder="Ophaaladres" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Naar</label>
                      <Input placeholder="Bestemmingsadres" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Datum</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tijd</label>
                      <Input type="time" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Opmerkingen</label>
                    <Textarea placeholder="Eventuele bijzonderheden..." rows={3} />
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Verstuur aanvraag
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
