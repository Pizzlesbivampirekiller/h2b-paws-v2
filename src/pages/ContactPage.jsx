import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactForm from '../components/contact/ContactForm'
import GlobeMap from '../components/contact/GlobeMap'
import FAQAccordion from '../components/contact/FAQAccordion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'

const contactInfo = [
  { icon: MapPin, label: 'Visit Us', value: '127 Wooster Street\nSoHo, New York, NY 10012' },
  { icon: Phone, label: 'Call Us', value: '+1 (212) 555-PAWS' },
  { icon: Mail, label: 'Email Us', value: 'hello@h2bpaws.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am–7pm\nSun: 12pm–5pm' },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-semibold text-cream mt-4 mb-6"
          >
            We'd love to hear
            <br />
            from you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cream/50 text-lg max-w-xl mx-auto"
          >
            Whether it's a question about sizing, a custom order request, or just saying hello — our team is here.
          </motion.p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="relative -mt-10 pb-16 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white shadow-sm border border-sand/50 text-center lg:text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-terracotta/10 text-terracotta mb-3 mx-auto lg:mx-0">
                  <item.icon size={18} />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/40 mb-1">{item.label}</h3>
                <p className="text-sm text-charcoal/60 whitespace-pre-line leading-relaxed">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Globe */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-8">Send a Message</h2>
              <ContactForm />
            </ScrollReveal>
            <ScrollReveal direction="left">
              <GlobeMap />
              <div className="mt-8 space-y-3">
                <h3 className="font-serif text-lg font-semibold text-charcoal">Our Locations</h3>
                {[
                  { city: 'New York', flag: '🇺🇸', role: 'Flagship & HQ' },
                  { city: 'Paris', flag: '🇫🇷', role: 'European Atelier' },
                  { city: 'Tokyo', flag: '🇯🇵', role: 'Asia-Pacific Hub' },
                ].map((loc) => (
                  <div key={loc.city} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{loc.flag}</span>
                    <span className="font-medium text-charcoal">{loc.city}</span>
                    <span className="text-charcoal/30">— {loc.role}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading
            subtitle="FAQ"
            title="Frequently Asked Questions"
          />
          <FAQAccordion />
        </div>
      </section>
    </main>
  )
}
