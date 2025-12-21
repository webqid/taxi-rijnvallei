"use client"

import { useState } from "react"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="3" x2="12" y2="9" />
                <line x1="12" y1="15" x2="12" y2="21" />
                <line x1="3" y1="12" x2="9" y2="12" />
                <line x1="15" y1="12" x2="21" y2="12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground">Taxi Rijnvallei</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Diensten
              </a>
              <a href="#airport" className="text-muted-foreground hover:text-foreground transition-colors">
                Luchthaven
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
            <a href="tel:+31317844466" className="flex items-center space-x-2 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">0317-844466</span>
            </a>
            <Button className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="#contact">Reserveren</a>
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t mt-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Diensten
              </a>
              <a
                href="#airport"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Luchthaven
              </a>
              <a
                href="#rates"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarieven
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2" asChild>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Reserveren</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
