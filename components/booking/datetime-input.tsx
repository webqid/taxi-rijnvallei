'use client'

import * as React from 'react'
import { Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DateTimeInputProps {
  id: string
  label: string
  value: string | null
  onChange: (value: string | null) => void
  minDateTime?: string
  className?: string
}

function toLocalDateTimeString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function toISOString(localDateTime: string): string {
  const date = new Date(localDateTime)
  return date.toISOString()
}

function fromISOString(isoString: string): string {
  const date = new Date(isoString)
  return toLocalDateTimeString(date)
}

export function DateTimeInput({
  id,
  label,
  value,
  onChange,
  minDateTime,
  className,
}: DateTimeInputProps) {
  // Calculate minimum datetime
  const getMinDateTime = () => {
    if (minDateTime) return minDateTime
    const now = new Date()
    // Round up to next 15 minutes
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15)
    now.setSeconds(0, 0)
    return toLocalDateTimeString(now)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localValue = e.target.value
    if (localValue) {
      onChange(toISOString(localValue))
    } else {
      onChange(null)
    }
  }

  const displayValue = value ? fromISOString(value) : ''

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
        <Calendar className="h-4 w-4" />
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="datetime-local"
          value={displayValue}
          onChange={handleChange}
          min={getMinDateTime()}
          className="pr-10"
        />
        <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}
