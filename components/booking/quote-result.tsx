'use client'

import * as React from 'react'
import { AlertCircle, ArrowRight, BadgeCheck, Check, Clock, Info, Route, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDistance, formatDuration } from '@/lib/services/pricing'
import type { QuoteResponseWithGeometry } from '@/lib/types/booking'

interface QuoteResultProps {
  quote: QuoteResponseWithGeometry | null
  error: string | null
  className?: string
  onBookClick?: () => void
}

export function QuoteResult({ quote, error, className, onBookClick }: QuoteResultProps) {
  if (error) {
    return (
      <Card className={cn('border-destructive/50 bg-destructive/5', className)}>
        <CardContent className="flex items-center gap-3 pt-6" role="alert">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!quote) {
    return null
  }

  const isFixed = quote.pricing === 'fixed'

  return (
    <Card className={cn('overflow-hidden pt-0', className)} aria-live="polite">
      <CardHeader className="bg-linear-to-r from-sky-600 to-sky-700 py-4 text-white">
        <CardTitle className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Uw offerte
          </span>
          <span className="text-2xl font-bold tabular-nums">{formatPrice(quote.totalCents)}</span>
        </CardTitle>
        <p className="flex items-center gap-1.5 text-sm text-sky-50">
          {isFixed ? (
            <>
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Vaste prijs
            </>
          ) : (
            'Prijsindicatie op basis van het taximetertarief'
          )}
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Route className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Afstand</p>
              <p className="font-semibold">{formatDistance(quote.distanceMeters)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Geschatte rijtijd</p>
              <p className="font-semibold">{formatDuration(quote.durationSeconds)}</p>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2">
          <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Prijsopbouw
          </h4>
          <div className="divide-y rounded-lg border">
            {quote.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium tabular-nums">{formatPrice(item.amountCents)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-muted/30 px-4 py-3 font-semibold">
              <span>Totaal</span>
              <span className="text-lg text-sky-700 tabular-nums">{formatPrice(quote.totalCents)}</span>
            </div>
          </div>
        </div>

        {/* Book button */}
        {onBookClick && (
          <Button
            onClick={onBookClick}
            size="xl"
            className="w-full gap-2 bg-green-700 text-lg font-semibold text-white hover:bg-green-800"
          >
            Reserveren
            <ArrowRight className="h-5 w-5" />
          </Button>
        )}

        {quote.notes.length > 0 && (
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {quote.notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
