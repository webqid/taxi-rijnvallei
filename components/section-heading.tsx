import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <h2 className="mb-4 text-3xl font-bold text-balance lg:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto max-w-2xl text-xl text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
