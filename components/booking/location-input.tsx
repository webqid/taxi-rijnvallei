'use client'

import * as React from 'react'
import { MapPin, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useGeocodeSuggestions } from '@/hooks/use-geocode-suggestions'
import { useDebounce } from '@/hooks/use-debounce'
import type { Location, GeocodeSuggestion } from '@/lib/types/booking'

interface LocationInputProps {
  id: string
  label: string
  placeholder?: string
  value: Location | null
  onChange: (location: Location | null) => void
  className?: string
  icon?: React.ReactNode
}

export function LocationInput({
  id,
  label,
  placeholder = 'Zoek een adres...',
  value,
  onChange,
  className,
  icon,
}: LocationInputProps) {
  const [inputValue, setInputValue] = React.useState(value?.label ?? '')
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listboxRef = React.useRef<HTMLUListElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(inputValue, 300)
  const { suggestions, isLoading, error } = useGeocodeSuggestions({
    query: debouncedQuery,
    enabled: isOpen && !value,
  })

  // Sync input with external value changes
  React.useEffect(() => {
    if (value?.label !== inputValue) {
      setInputValue(value?.label ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.label])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset highlight when suggestions change
  React.useEffect(() => {
    setHighlightedIndex(-1)
  }, [suggestions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsOpen(true)

    // Clear selected location when user types
    if (value) {
      onChange(null)
    }
  }

  const handleSelectSuggestion = (suggestion: GeocodeSuggestion) => {
    const location: Location = {
      label: suggestion.label,
      lat: suggestion.lat,
      lon: suggestion.lon,
    }
    onChange(location)
    setInputValue(suggestion.label)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  const handleFocus = () => {
    if (!value && inputValue.length >= 2) {
      setIsOpen(true)
    }
  }

  const handleClear = () => {
    setInputValue('')
    onChange(null)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const listboxId = `${id}-listbox`
  const showDropdown = isOpen && (suggestions.length > 0 || isLoading || error)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon ?? <MapPin className="h-4 w-4" />}
        </div>
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="pl-10 pr-10"
          role="combobox"
          aria-expanded={showDropdown ? true : false}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined
          }
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoading && (value || inputValue) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Wis locatie"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label={`${label} suggesties`}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-popover p-1 shadow-lg"
        >
          {isLoading ? (
            <li className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Laden...
            </li>
          ) : error ? (
            <li className="px-3 py-2 text-sm text-destructive">
              {error}
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              Geen resultaten gevonden
            </li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion.placeId}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
                  highlightedIndex === index
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                )}
                onMouseDown={(e) => {
                  // Prevent the mousedown from triggering the outside click handler
                  e.preventDefault()
                  handleSelectSuggestion(suggestion)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="line-clamp-2">{suggestion.label}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
