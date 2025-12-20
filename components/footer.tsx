import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">TR</span>
              </div>
              <h3 className="text-xl font-bold">Taxi Rijnvallei</h3>
            </div>
            <p className="text-background/80 mb-4 text-pretty">
              Uw betrouwbare vervoerspartner in de Rijnvallei regio. Al meer dan 15 jaar persoonlijke service met lokale
              expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                Facebook
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>0317-123456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@taxi-rijnvallei.nl</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Hoofdstraat 123</p>
                  <p>6707 AA Wageningen</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>
            <ul className="space-y-2 text-background/80">
              <li>Lokale ritten</li>
              <li>Luchthaven transfers</li>
              <li>Zakelijke ritten</li>
              <li>Groepsvervoer</li>
              <li>24/7 service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Openingstijden</h4>
            <div className="space-y-2 text-background/80">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 beschikbaar</span>
              </div>
              <p className="text-sm">Telefonische service</p>
              <p className="text-sm">WhatsApp: 06:00 - 24:00</p>
              <p className="text-sm">Kantoor: Ma-Vr 08:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              <p>© 2025 Taxi Rijnvallei. Alle rechten voorbehouden.</p>
              <p>KvK: 12345678 | BTW: NL123456789B01</p>
            </div>
            <div className="flex space-x-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">
                Privacybeleid
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Algemene voorwaarden
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
