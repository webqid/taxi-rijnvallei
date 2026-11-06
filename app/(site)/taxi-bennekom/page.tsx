import { LocationLandingPage, locationMetadata } from '@/components/location-page'
import { getLocation } from '@/lib/config/locations'

const location = getLocation('taxi-bennekom')

export const metadata = locationMetadata(location)

export default function Page() {
  return <LocationLandingPage location={location} />
}
