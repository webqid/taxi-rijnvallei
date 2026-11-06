/**
 * Renders structured data as JSON-LD script tags.
 *
 * `<` is escaped to prevent the JSON from closing the script tag (XSS), as
 * recommended in node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ))
}
