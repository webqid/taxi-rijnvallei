import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ContactForm } from '@/components/contact-form'
import { PhoneLink, WhatsAppButton } from '@/components/contact-links'
import { SectionHeading } from '@/components/section-heading'
import { SITE, type WhatsAppMessage } from '@/lib/config/site'

interface ContactSectionProps {
  whatsappMessage?: WhatsAppMessage
}

export default function ContactSection({ whatsappMessage = 'default' }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Contact & Reservering"
          description="Neem contact met ons op voor uw reservering of vragen. Wij staan 24/7 voor u klaar."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid content-start gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Telefonisch reserveren</h3>
                  <p className="mb-3 text-muted-foreground">24/7 bereikbaar</p>
                  <PhoneLink
                    cta="contact"
                    className="block text-xl font-bold text-primary transition-colors hover:text-primary/80"
                  />
                  <PhoneLink
                    cta="contact-mobile"
                    number="mobile"
                    className="block text-lg font-semibold text-primary transition-colors hover:text-primary/80"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <MessageCircle className="size-6 text-emerald-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">WhatsApp</h3>
                  <p className="mb-3 text-muted-foreground">Snel en gemakkelijk reserveren</p>
                  <WhatsAppButton
                    cta="contact"
                    message={whatsappMessage}
                    size="lg"
                    label="Start WhatsApp-chat"
                    floatingAnchor={false}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">E-mail</h3>
                  <a href={`mailto:${SITE.email}`} className="text-primary transition-colors hover:text-primary/80">
                    {SITE.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Bereikbaarheid</h3>
                  <p className="text-muted-foreground">Telefoon en WhatsApp: 24/7 bereikbaar</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
