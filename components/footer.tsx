import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TR</span>
              </div>
              <h3 className="text-xl font-bold">Taxi Rijnvallei</h3>
            </div>
            <div className="text-background/80 space-y-1">
              <p>Beekstraat 13</p>
              <p>6707 DR Wageningen</p>
              <p className="text-sm mt-3">KvK 65497759</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+31317844466" className="hover:text-background transition-colors">0317-844466</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+31647145342" className="hover:text-background transition-colors">06-47145342</a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/31647145342" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">WhatsApp</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@taxirijnvallei.nl" className="hover:text-background transition-colors">info@taxirijnvallei.nl</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>
            <ul className="space-y-2 text-background/80">
              <li>Particulier vervoer</li>
              <li>Zakelijk vervoer</li>
              <li>Luchthavenvervoer</li>
              <li>Stationsvervoer</li>
              <li>Ziekenhuisvervoer</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Bereikbaarheid</h4>
            <div className="space-y-2 text-background/80">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 bereikbaar</span>
              </div>
              <p className="text-sm">Telefoon en WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              <p>© 2025 Taxi Rijnvallei. Alle rechten voorbehouden.</p>
            </div>
            <div className="flex space-x-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">
                Privacybeleid
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Algemene voorwaarden
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
