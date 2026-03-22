import { NextResponse } from 'next/server'
import { ContactFormSchema } from '@/lib/schemas/booking'
import { formatPrice, formatDistance, formatDuration } from '@/lib/services/pricing'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const result = ContactFormSchema.safeParse(body)
    if (!result.success) {
      console.log('Validation errors:', result.error.issues)
      return NextResponse.json(
        { error: 'Ongeldige aanvraag. Controleer de ingevulde gegevens.', details: result.error.issues },
        { status: 400 }
      )
    }

    const data = result.data

    // Build email content
    const hasBookingData = data.origin && data.destination && data.pickupAt

    let emailText = `
Nieuwe contactaanvraag van ${data.name}

Contactgegevens:
- Naam: ${data.name}
- Telefoon: ${data.phone}
- E-mail: ${data.email}
`

    if (hasBookingData) {
      emailText += `
Ritgegevens:
- Van: ${data.origin?.label}
- Naar: ${data.destination?.label}
`
      if (data.stopovers && data.stopovers.length > 0) {
        emailText += `- Via: ${data.stopovers.map((s) => s.label).join(', ')}\n`
      }

      const pickupDate = new Date(data.pickupAt!)
      emailText += `- Ophalen: ${pickupDate.toLocaleString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}\n`

      if (data.returnAt) {
        const returnDate = new Date(data.returnAt)
        emailText += `- Retour: ${returnDate.toLocaleString('nl-NL', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}\n`
      }

      emailText += `- Passagiers: ${data.passengers}\n`
      emailText += `- Bagage: ${data.luggage ? 'Grote bagage' : 'Handbagage'}\n`

      if (data.quoteTotalCents) {
        emailText += `
Berekende offerte:
- Prijs: ${formatPrice(data.quoteTotalCents)}
- Afstand: ${data.quoteDistanceMeters ? formatDistance(data.quoteDistanceMeters) : '-'}
- Rijtijd: ${data.quoteDurationSeconds ? formatDuration(data.quoteDurationSeconds) : '-'}
`
      }
    }

    if (data.message) {
      emailText += `
Opmerkingen:
${data.message}
`
    }

    const subject = hasBookingData
      ? `Nieuwe reservering van ${data.name}`
      : `Nieuwe aanvraag van ${data.name}`

    const accessKey = process.env.WEB3FORMS_KEY || '01f94a2a-07e4-4f29-9823-d6adf4cb39a7'

    const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: data.name,
          replyto: data.email,
          message: emailText,
        }),
      })

      const apiResult = await res.json()
      if (!res.ok || !apiResult.success) {
        console.error('Web3Forms error:', apiResult)
        return NextResponse.json(
          { error: 'Fout bij verzenden. Probeer het later opnieuw.' },
          { status: 500 }
        )
      }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
