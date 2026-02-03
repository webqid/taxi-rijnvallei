'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface QuoteSkeletonProps {
  className?: string
}

export function QuoteSkeleton({ className }: QuoteSkeletonProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="bg-muted pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted-foreground/20" />
            <div className="h-6 w-24 animate-pulse rounded bg-muted-foreground/20" />
          </div>
          <div className="h-8 w-20 animate-pulse rounded bg-muted-foreground/20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Summary stats skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <div className="h-5 w-5 animate-pulse rounded bg-muted-foreground/20" />
            <div className="space-y-1">
              <div className="h-3 w-12 animate-pulse rounded bg-muted-foreground/20" />
              <div className="h-5 w-16 animate-pulse rounded bg-muted-foreground/20" />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <div className="h-5 w-5 animate-pulse rounded bg-muted-foreground/20" />
            <div className="space-y-1">
              <div className="h-3 w-16 animate-pulse rounded bg-muted-foreground/20" />
              <div className="h-5 w-14 animate-pulse rounded bg-muted-foreground/20" />
            </div>
          </div>
        </div>

        {/* Price breakdown skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-pulse rounded bg-muted-foreground/20" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted-foreground/20" />
          </div>
          <div className="divide-y rounded-lg border">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <div className="h-4 w-32 animate-pulse rounded bg-muted-foreground/20" />
                <div className="h-4 w-14 animate-pulse rounded bg-muted-foreground/20" />
              </div>
            ))}
            <div className="flex items-center justify-between bg-muted/30 px-4 py-3">
              <div className="h-5 w-12 animate-pulse rounded bg-muted-foreground/20" />
              <div className="h-6 w-16 animate-pulse rounded bg-muted-foreground/20" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-3 w-64 animate-pulse rounded bg-muted-foreground/20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function MapSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="relative aspect-video bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 h-10 w-10 animate-pulse rounded-full bg-muted-foreground/20" />
            <div className="mx-auto h-4 w-32 animate-pulse rounded bg-muted-foreground/20" />
          </div>
        </div>
        {/* Fake map grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border border-muted-foreground/5" />
          ))}
        </div>
      </div>
    </Card>
  )
}
