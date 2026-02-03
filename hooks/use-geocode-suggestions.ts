'use client'

import { useQuery } from '@tanstack/react-query'
import type { GeocodeSuggestion } from '@/lib/types/booking'

interface UseGeocodeSuggestionsOptions {
  query: string
  enabled?: boolean
}

interface GeocodeSuggestionsResult {
  suggestions: GeocodeSuggestion[]
  isLoading: boolean
  error: string | null
}

async function fetchGeocodeSuggestions(query: string): Promise<GeocodeSuggestion[]> {
  const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to fetch suggestions')
  }

  return response.json()
}

export function useGeocodeSuggestions({
  query,
  enabled = true,
}: UseGeocodeSuggestionsOptions): GeocodeSuggestionsResult {
  const trimmedQuery = query.trim()
  const shouldFetch = enabled && trimmedQuery.length >= 2

  const { data, isLoading, error } = useQuery({
    queryKey: ['geocode', trimmedQuery],
    queryFn: () => fetchGeocodeSuggestions(trimmedQuery),
    enabled: shouldFetch,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  })

  return {
    suggestions: data ?? [],
    isLoading: shouldFetch && isLoading,
    error: error instanceof Error ? error.message : null,
  }
}
