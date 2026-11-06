import type { SVGProps } from 'react'

/**
 * Steering wheel mark used as the site logo (header, footer, favicon, share
 * image). Drawn in the same 24×24 line style as the lucide icons.
 */
export function SteeringWheelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 14.5V22" />
      <path d="M9.6 11.3 2.4 9.3" />
      <path d="M14.4 11.3l7.2-2" />
    </svg>
  )
}

/** The mark on its round taxi-yellow badge. */
export function LogoMark({ className = 'size-10' }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-amber-400 text-neutral-900 ${className}`}>
      <SteeringWheelIcon className="size-[60%]" />
    </span>
  )
}
