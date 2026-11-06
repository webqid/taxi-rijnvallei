import Image from 'next/image'
import type { Photo } from '@/components/location-photos'
import { cn } from '@/lib/utils'

/**
 * A photo cropped to its frame: `object-fit: cover`, with `photo.position`
 * choosing which part stays in view. The size of the frame comes from the
 * `className` (for example an aspect ratio or a height).
 */
export function PhotoFrame({
  photo,
  className,
  sizes,
}: {
  photo: Photo
  className: string
  sizes: string
}) {
  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder={photo.src.blurDataURL ? 'blur' : 'empty'}
        className="object-cover"
        style={{ objectPosition: photo.position }}
      />
    </div>
  )
}
