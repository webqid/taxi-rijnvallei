import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { getBreadcrumbSchema } from '@/lib/config/structured-data'

interface BreadcrumbsProps {
  /** Trail after "Home"; the last item is the current page. */
  items: { name: string; path: string }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Kruimelpad" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1">
              <ChevronRight className="size-3.5" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-foreground hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={getBreadcrumbSchema(items)} />
    </>
  )
}
