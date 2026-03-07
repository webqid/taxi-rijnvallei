'use client'

import * as React from 'react'
import { Phone, MessageCircle, Clock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
}

const initialFormState: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

export default function ContactSection() {
  const [formData, setFormData] = React.useState<ContactFormData>(initialFormState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Aanvraag van ${formData.name}`)
    const body = encodeURIComponent(
      `Naam: ${formData.name}\nTelefoon: ${formData.phone}\nE-mail: ${formData.email}\n\n${formData.message}`
    )

    window.open(`mailto:info@taxirijnvallei.nl?subject=${subject}&body=${body}`, '_blank')
  }

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
          <div className="grid gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Telefonisch reserveren</h3>
                    <p className="text-muted-foreground mb-3">24/7 bereikbaar</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+31317844466"
                        className="text-xl font-bold text-primary hover:text-primary/80 transition-colors block"
                      >
                        0317-844466
                      </a>
                      <a
                        href="tel:+31647145342"
                        className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors block"
                      >
                        06-47145342
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground mb-3">Snel en gemakkelijk reserveren</p>
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                      <a href="https://wa.me/31647145342" target="_blank" rel="noopener noreferrer">
                        Start WhatsApp chat
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">E-mail</h3>
                    <a
                      href="mailto:info@taxirijnvallei.nl"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      info@taxirijnvallei.nl
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Bereikbaarheid</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Telefoon: 24/7 bereikbaar</p>
                      <p>WhatsApp: 24/7 bereikbaar</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Stuur ons een bericht</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-sm font-medium mb-2 block">Naam *</label>
                      <Input
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Uw naam"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="text-sm font-medium mb-2 block">Telefoon *</label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Uw telefoonnummer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-sm font-medium mb-2 block">E-mail *</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="uw.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-sm font-medium mb-2 block">Uw bericht</label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Waar kunnen wij u mee helpen?"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
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
