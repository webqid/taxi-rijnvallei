'use client'

import * as React from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface ReturnToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function ReturnToggle({ checked, onChange, className }: ReturnToggleProps) {
  const id = React.useId()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        className="h-5 w-5"
      />
      <Label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2 text-sm font-medium"
      >
        <RotateCcw className="h-4 w-4" />
        Retour gewenst
      </Label>
    </div>
  )
}
