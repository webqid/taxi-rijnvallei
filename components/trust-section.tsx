import { Clock, Euro, ShieldCheck, Users } from "lucide-react"

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Betrouwbaar",
    description: "Altijd op tijd, geen verrassingen achteraf",
  },
  {
    icon: Euro,
    title: "Vaste tarieven",
    description: "Transparante prijzen, vooraf bekend",
  },
  {
    icon: Clock,
    title: "24/7 bereikbaar",
    description: "Dag en nacht beschikbaar voor uw rit",
  },
  {
    icon: Users,
    title: "Professionele chauffeurs",
    description: "Ervaren en vriendelijke chauffeurs",
  },
]

export default function TrustSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
