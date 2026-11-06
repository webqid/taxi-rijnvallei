import Link from 'next/link'
import { Home, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CallButton } from '@/components/contact-links'
import { whatsappHref } from '@/lib/config/site'

export default function NotFound() {
  return (
    <main id="main" className="flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-lg space-y-8 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="size-10 text-primary" aria-hidden="true" />
              </div>
            </div>
            <p className="text-7xl font-bold text-primary">404</p>
            <h1 className="text-2xl font-bold">Pagina niet gevonden</h1>
            <p className="text-pretty text-muted-foreground">
              Sorry, deze pagina bestaat niet of is verplaatst. Maar geen zorgen: wij brengen u graag op de
              juiste bestemming.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="xl" variant="outline" asChild>
              <Link href="/">
                <Home aria-hidden="true" />
                Naar de homepage
              </Link>
            </Button>
            <CallButton cta="not-found" label="Bel" />
          </div>

          <p className="text-sm text-muted-foreground">
            Of stuur een{' '}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-not-found"
              className="text-primary hover:underline"
            >
              WhatsApp-bericht
            </a>
            , of{' '}
            <Link href="/taxi-schiphol" className="text-primary hover:underline">
              bekijk onze vaste prijzen naar Schiphol
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
