"use client"

import { Phone, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function CtaSection() {
  const [form, setForm] = useState({ naam: "", email: "", onderwerp: "", bericht: "" })
  const [status, setStatus] = useState<string | null>(null)


  function handleMailto(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(form.onderwerp || `Contactformulier Taxi Rijnvallei`)
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nE-mail: ${form.email}\nOnderwerp: ${form.onderwerp || "-"}\n\nBericht:\n${form.bericht}`
    )
    window.location.href = `mailto:info@taxirijnvallei.nl?subject=${subject}&body=${body}`
  }

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

          <form onSubmit={handleMailto} className="mt-12 text-left bg-background/80 rounded-xl shadow-sm p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Contactformulier</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Naam *</label>
                <Input required value={form.naam} onChange={e => setForm(f => ({ ...f, naam: e.target.value }))} placeholder="Uw naam" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">E-mail *</label>
                <Input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="uw@email.nl" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Onderwerp</label>
                <Input value={form.onderwerp} onChange={e => setForm(f => ({ ...f, onderwerp: e.target.value }))} placeholder="Onderwerp" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bericht *</label>
                <Textarea required rows={4} value={form.bericht} onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))} placeholder="Uw bericht..." />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">Verstuur</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
