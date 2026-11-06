import type { StaticImageData } from 'next/image'
import type { LocationPage } from '@/lib/config/locations'
import heathEde from '@/public/ede.jpg'
import hospitalGeldersevallei from '@/public/ede-gelderse-vallei.jpg'
import krollerMullerGarden from '@/public/ede-km.jpg'
import krollerMullerEntrance from '@/public/ede-km-entree.jpg'
import arnhemCentraal from '@/public/arnhem-centraal.webp'
import schiphol from '@/public/amsterdam-schiphol.jpg'
import wurCampus from '@/public/wageningen-wur-campus.jpg'

// Turbopack cannot import AVIF files, so this one is referenced by its public
// path with its size (1280×720). The image server still optimises it.
const rijnstateArnhem: StaticImageData = { src: '/arnhem-rijnstate.avif', width: 1280, height: 720 }

/**
 * Photos on the local pages. The files in /public are the originals: they are
 * cropped here with CSS (`object-fit: cover` and `position`), and next/image
 * serves each one as a small AVIF/WebP in the size the layout needs.
 *
 * `position` is the CSS object-position: which part of the photo stays in view
 * when the frame is wider or narrower than the photo.
 */
export interface Photo {
  src: StaticImageData
  alt: string
  /** CSS object-position, "x% y%". Default: centre. */
  position?: string
}

/** Wide banner under the hero of a page. */
export const HERO_PHOTOS: Partial<Record<LocationPage['slug'], Photo>> = {
  'taxi-ede': {
    src: heathEde,
    alt: 'Bloeiende heide bij zonsopkomst op de Veluwe bij Ede',
    // Portrait photo: keep the tree, the sun and the heather in the wide frame.
    position: '50% 52%',
  },
  'taxi-arnhem': {
    src: rijnstateArnhem,
    alt: 'Entree van Ziekenhuis Rijnstate in Arnhem in de avond',
    // 16:9 photo in a wide frame: keep the Rijnstate sign and the entrance.
    position: '50% 70%',
  },
  'taxi-wageningen': {
    src: wurCampus,
    alt: 'Wageningen Campus van Wageningen University & Research bij avondschemering',
    // Keep the whole building and the beetle sculpture, drop most of the sky.
    position: '50% 21%',
  },
}

/** Wide banner on /taxi-schiphol. */
export const SCHIPHOL_PHOTO: Photo = {
  src: schiphol,
  alt: 'De ingang van Amsterdam Airport Schiphol met het AMS Schiphol-logo',
  // Keep the whole red circle and the sign, drop the dark top edge.
  position: '50% 48%',
}

/** Photos on a destination card, by destination name. Two photos sit side by side. */
export const DESTINATION_PHOTOS: Record<string, Photo[]> = {
  'Ziekenhuis Gelderse Vallei': [
    { src: hospitalGeldersevallei, alt: 'Ziekenhuis Gelderse Vallei in Ede', position: '50% 40%' },
  ],
  'Kröller-Müller Museum': [
    {
      src: krollerMullerEntrance,
      alt: 'Entree van het Kröller-Müller Museum in Nationaal Park De Hoge Veluwe',
      position: '30% 50%',
    },
    {
      src: krollerMullerGarden,
      alt: 'Bezoekers in de beeldentuin van het Kröller-Müller Museum',
      position: '68% 55%',
    },
  ],
  'Arnhem Centraal': [
    { src: arnhemCentraal, alt: 'Station Arnhem Centraal', position: '25% 50%' },
  ],
  Arnhem: [{ src: rijnstateArnhem, alt: 'Ziekenhuis Rijnstate in Arnhem', position: '30% 50%' }],
}
