import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TR</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Taxi Rijnvallei</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Diensten
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Over ons
              </a>
              <a href="#rates" className="text-muted-foreground hover:text-foreground transition-colors">
                Tarieven
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <a href="tel:+31317123456" className="flex items-center space-x-2 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">0317-123456</span>
            </a>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Boek Nu</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
