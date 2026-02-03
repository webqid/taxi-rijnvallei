'use client'

import * as React from 'react'
import { Briefcase } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface LuggageRadioProps {
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}

export function LuggageRadio({ value, onChange, className }: LuggageRadioProps) {
  const groupName = React.useId()

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Briefcase className="h-4 w-4" />
        Bagage
      </Label>
      <div
        role="radiogroup"
        aria-label="Bagage opties"
        className="flex flex-col gap-2 sm:flex-row sm:gap-4"
      >
        <label
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors',
            value
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          )}
        >
          <input
            type="radio"
            name={groupName}
            value="yes"
            checked={value === true}
            onChange={() => onChange(true)}
            className="sr-only"
          />
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
              value ? 'border-primary' : 'border-muted-foreground/50'
            )}
          >
            {value && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </div>
          <span className="text-sm font-medium">Ja, ik heb bagage</span>
        </label>

        <label
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors',
            !value
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          )}
        >
          <input
            type="radio"
            name={groupName}
            value="no"
            checked={value === false}
            onChange={() => onChange(false)}
            className="sr-only"
          />
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
              !value ? 'border-primary' : 'border-muted-foreground/50'
            )}
          >
            {!value && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </div>
          <span className="text-sm font-medium">Nee, geen bagage</span>
        </label>
      </div>
    </div>
  )
}
