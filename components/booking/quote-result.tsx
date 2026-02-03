'use client'

import * as React from 'react'
import { Check, TrendingUp, Clock, Route, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatDistance, formatDuration } from '@/lib/services/pricing'
import type { QuoteResponseWithGeometry } from '@/hooks/use-quote'

interface QuoteResultProps {
  quote: QuoteResponseWithGeometry | null
  error: string | null
  className?: string
}

export function QuoteResult({ quote, error, className }: QuoteResultProps) {
  if (error) {
    return (
      <Card className={cn('border-destructive/50 bg-destructive/5', className)}>
        <CardContent className="flex items-center gap-3 pt-6">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!quote) {
    return null
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="bg-linear-to-r from-sky-500 to-sky-600 py-4 text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Uw offerte
          </span>
          <span className="text-2xl font-bold">{formatPrice(quote.totalCents)}</span>
        </CardTitle>
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
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium tabular-nums">
                  {formatPrice(item.amountCents)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-muted/30 px-4 py-3 font-semibold">
              <span>Totaal</span>
              <span className="text-lg tabular-nums text-sky-600">
                {formatPrice(quote.totalCents)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Deze prijs is indicatief en kan variëren op basis van de werkelijke route en omstandigheden.
        </p>
      </CardContent>
    </Card>
  )
}
