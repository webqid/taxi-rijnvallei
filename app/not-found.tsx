import Link from "next/link"
import { Phone, MessageCircle, Home, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center space-y-8">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-7xl font-bold text-primary">404</h1>
              <h2 className="text-2xl font-bold">Pagina niet gevonden</h2>
              <p className="text-muted-foreground text-pretty">
                Sorry, deze pagina bestaat niet of is verplaatst. Maar geen zorgen — wij
                brengen u graag op de juiste bestemming.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Naar homepagina
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a href="tel:+31317844466">
                  <Phone className="w-5 h-5 mr-2" />
                  Bel 0317-844466
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Of stuur een{" "}
              <a
                href="https://wa.me/31647145342"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp-bericht
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}