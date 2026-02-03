'use client'

import * as React from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SwapButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function SwapButton({ onClick, disabled, className }: SwapButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label="Wissel vertrek- en aankomstlocatie"
      className={cn(
        'h-10 w-10 shrink-0 rounded-full transition-transform hover:scale-105',
        className
      )}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  )
}
