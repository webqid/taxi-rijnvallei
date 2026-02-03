'use client'

import { useMutation } from '@tanstack/react-query'
import type { QuoteRequest, QuoteResponse } from '@/lib/types/booking'

interface QuoteResponseWithGeometry extends QuoteResponse {
  geometry?: string
  returnGeometry?: string
}

async function fetchQuote(request: QuoteRequest): Promise<QuoteResponseWithGeometry> {
  const response = await fetch('/api/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to fetch quote')
  }

  return response.json()
}

export function useQuote() {
  const mutation = useMutation({
    mutationFn: fetchQuote,
    retry: 1,
  })

  return {
    calculateQuote: mutation.mutate,
    calculateQuoteAsync: mutation.mutateAsync,
    quote: mutation.data ?? null,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
    reset: mutation.reset,
  }
}

export type { QuoteResponseWithGeometry }
