'use client'

import * as React from 'react'
import { Minus, Plus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PRICING_CONFIG } from '@/lib/config/pricing'

interface PassengerStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function PassengerStepper({
  value,
  onChange,
  min = PRICING_CONFIG.minPassengers,
  max = PRICING_CONFIG.maxPassengers,
  className,
}: PassengerStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const canDecrement = value > min
  const canIncrement = value < max

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-sm font-medium text-foreground">
        Aantal passagiers
      </label>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Verminder aantal passagiers"
          className="h-10 w-10 shrink-0"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex min-w-16 items-center justify-center gap-2 rounded-md border bg-background px-3 py-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span
            className="text-lg font-medium tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {value}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Verhoog aantal passagiers"
          className="h-10 w-10 shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Maximaal {max} passagiers
      </p>
    </div>
  )
}
