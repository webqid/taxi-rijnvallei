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
  /** Earliest allowed moment as ISO string. Defaults to now. */
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
  return new Date(localDateTime).toISOString()
}

function fromISOString(isoString: string): string {
  return toLocalDateTimeString(new Date(isoString))
}

/** Now, rounded up to the next quarter of an hour, in the visitor's local time. */
function nextQuarterHour(): string {
  const now = new Date()
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0)
  return toLocalDateTimeString(now)
}

const subscribeNever = () => () => {}

/**
 * True in the browser, false while prerendering on the server. The current time
 * must not be read during prerendering (it would be frozen into the static HTML
 * and differ from the visitor's local time).
 */
function useIsBrowser() {
  return React.useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  )
}

export function DateTimeInput({
  id,
  label,
  value,
  onChange,
  minDateTime,
  className,
}: DateTimeInputProps) {
  const isBrowser = useIsBrowser()
  const min = minDateTime ? fromISOString(minDateTime) : isBrowser ? nextQuarterHour() : undefined

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localValue = e.target.value
    onChange(localValue ? toISOString(localValue) : null)
  }

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
          value={value ? fromISOString(value) : ''}
          onChange={handleChange}
          min={min}
          className="pr-10"
        />
        <Clock className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}
