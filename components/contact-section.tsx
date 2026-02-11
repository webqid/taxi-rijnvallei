'use client'

import * as React from 'react'
import { Phone, MessageCircle, Clock, Check, Loader2, MapPin, Navigation, Calendar, Users, Luggage, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useBookingContext } from '@/lib/context/booking-context'
import { formatPrice, formatDistance, formatDuration } from '@/lib/services/pricing'

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
  const { bookingData, clearBookingData } = useBookingContext()
  const [formData, setFormData] = React.useState<ContactFormData>(initialFormState)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Include booking data if available
          ...(bookingData && {
            origin: bookingData.origin,
            destination: bookingData.destination,
            stopovers: bookingData.stopovers,
            pickupAt: bookingData.pickupAt,
            returnAt: bookingData.returnAt,
            luggage: bookingData.luggage,
            passengers: bookingData.passengers,
            quoteTotalCents: bookingData.quote?.totalCents,
            quoteDistanceMeters: bookingData.quote?.distanceMeters,
            quoteDurationSeconds: bookingData.quote?.durationSeconds,
          }),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      // Reset form and booking data, show success dialog
      setFormData(initialFormState)
      clearBookingData()
      setShowSuccessDialog(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Er is iets misgegaan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDateTime = (isoString: string | null) => {
    if (!isoString) return '-'
    const date = new Date(isoString)
    return date.toLocaleString('nl-NL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
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
          <div className="space-y-8">
            {/* Booking Summary Card - Only shown when there's booking data */}
            {bookingData && bookingData.quote && (
              <Card className="border-sky-200 bg-sky-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Uw berekende rit</h3>
                    <span className="text-2xl font-bold text-sky-600">
                      {formatPrice(bookingData.quote.totalCents)}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    {/* Route */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Van</p>
                        <p className="font-medium">{bookingData.origin?.label}</p>
                      </div>
                    </div>

                    {bookingData.stopovers?.map((stopover, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Via</p>
                          <p className="font-medium">{stopover.label}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-start gap-3">
                      <Navigation className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Naar</p>
                        <p className="font-medium">{bookingData.destination?.label}</p>
                      </div>
                    </div>

                    {/* Date/Time */}
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">{bookingData.returnAt ? 'Heenreis' : 'Ophalen'}</p>
                        <p className="font-medium">{formatDateTime(bookingData.pickupAt)}</p>
                      </div>
                    </div>

                    {bookingData.returnAt && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Retour</p>
                          <p className="font-medium">{formatDateTime(bookingData.returnAt)}</p>
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex gap-6 pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{bookingData.passengers} passagiers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Luggage className="h-4 w-4 text-muted-foreground" />
                        <span>{bookingData.luggage ? 'Grote bagage' : 'Handbagage'}</span>
                      </div>
                    </div>

                    {/* Distance & Duration */}
                    <div className="flex gap-6 text-muted-foreground">
                      <span>{formatDistance(bookingData.quote.distanceMeters)}</span>
                      <span>{formatDuration(bookingData.quote.durationSeconds)}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-muted-foreground"
                    onClick={clearBookingData}
                  >
                    Andere rit berekenen
                  </Button>
                </CardContent>
              </Card>
            )}

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
          </div>

          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">
                  {bookingData?.quote ? 'Bevestig uw reservering' : 'Stuur ons een bericht!'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

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

                    {/* Show route summary when booking data exists */}
                    {bookingData?.origin && bookingData?.destination && (
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span className="truncate">{bookingData.origin.label}</span>
                        </div>
                        {bookingData.stopovers?.map((stopover, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-orange-500" />
                            <span className="truncate">Via: {stopover.label}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <Navigation className="h-3 w-3 text-red-500" />
                          <span className="truncate">{bookingData.destination.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Heen: {formatDateTime(bookingData.pickupAt)}</span>
                        </div>
                        {bookingData.returnAt && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>Retour: {formatDateTime(bookingData.returnAt)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {bookingData?.quote ? 'Opmerkingen' : 'Uw bericht'}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={
                          bookingData?.quote
                            ? 'Eventuele bijzonderheden, speciale wensen...'
                            : 'Waar kunnen wij u mee helpen?'
                        }
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Verzenden...
                        </>
                      ) : bookingData?.quote ? (
                        'Reservering aanvragen'
                      ) : (
                        'Verstuur aanvraag'
                      )}
                    </Button>

                    {bookingData?.quote && (
                      <p className="text-center text-xs text-muted-foreground">
                        Door te verzenden gaat u akkoord met onze algemene voorwaarden.
                        De aangegeven prijs is indicatief.
                      </p>
                    )}
                  </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Bedankt voor uw aanvraag!</DialogTitle>
            <DialogDescription className="text-base">
              Wij nemen zo snel mogelijk contact met u op om uw reservering te bevestigen.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Sluiten
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
