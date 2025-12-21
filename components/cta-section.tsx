import { Phone, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section id="contact" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Reserveer uw rit</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Bel of stuur een bericht. Wij zijn 24 uur per dag bereikbaar voor uw reservering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="tel:+31317844466">
                <Phone className="w-5 h-5 mr-2" />
                Bel 0317-844466
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
              <a href="https://wa.me/31647145342" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center text-muted-foreground">
            <a href="mailto:info@taxirijnvallei.nl" className="flex items-center justify-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              info@taxirijnvallei.nl
            </a>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Of gebruik het contactformulier. Wij reageren zo snel mogelijk.
          </p>
        </div>
      </div>
    </section>
  )
}
