'use client'

import * as React from 'react'
import { Plus, X, MapPinned } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LocationInput } from './location-input'
import type { Location } from '@/lib/types/booking'

interface StopoverInputProps {
  stopovers: (Location | null)[]
  onChange: (stopovers: (Location | null)[]) => void
  maxStopovers?: number
  className?: string
}

export function StopoverInput({
  stopovers,
  onChange,
  maxStopovers = 5,
  className,
}: StopoverInputProps) {
  const addStopover = () => {
    if (stopovers.length < maxStopovers) {
      onChange([...stopovers, null])
    }
  }

  const removeStopover = (index: number) => {
    const newStopovers = stopovers.filter((_, i) => i !== index)
    onChange(newStopovers)
  }

  const updateStopover = (index: number, location: Location | null) => {
    const newStopovers = [...stopovers]
    newStopovers[index] = location
    onChange(newStopovers)
  }

  const canAddMore = stopovers.length < maxStopovers

  return (
    <div className={cn('space-y-3', className)}>
      {stopovers.map((stopover, index) => (
        <div key={index} className="flex items-end gap-2">
          <LocationInput
            id={`stopover-${index}`}
            label={`Tussenstop ${index + 1}`}
            placeholder="Voeg tussenstop toe..."
            value={stopover}
            onChange={(location) => updateStopover(index, location)}
            icon={<MapPinned className="h-4 w-4" />}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeStopover(index)}
            aria-label={`Verwijder tussenstop ${index + 1}`}
            className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {canAddMore && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addStopover}
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Tussenstop toevoegen
        </Button>
      )}
    </div>
  )
}
