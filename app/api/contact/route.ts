import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schemas/booking'
import { formatPrice, formatDistance, formatDuration } from '@/lib/services/pricing'

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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

    const toEmail = process.env.CONTACT_EMAIL || 'jcvandeweerd@gmail.com'
    // Use Resend's test email for unverified domains, or configured FROM_EMAIL
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

    // Send email via Resend
    if (resend) {
      const { data: emailData, error } = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject,
        text: emailText,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: `Fout bij verzenden: ${error.message}` },
          { status: 500 }
        )
      }
      
      console.log('Email sent successfully:', emailData?.id)
    } else {
      // Log only when no API key (development)
      console.log('=== Contact Form Submission (no RESEND_API_KEY) ===')
      console.log(emailText)
      console.log('=== End Submission ===')
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
