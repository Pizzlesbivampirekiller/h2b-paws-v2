import { useState } from 'react'
import { motion } from 'framer-motion'
import FAQAccordion from '../components/contact/FAQAccordion'
import GlobeMap from '../components/contact/GlobeMap'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { useAdmin } from '../context/AdminContext'

export default function ContactPage() {
  const { siteContent } = useAdmin()
  const bgImage = siteContent.bgContact || ''
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-sand bg-cream/50 text-charcoal focus:border-terracotta focus:outline-none transition-colors'

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
            {siteContent.contactTitle.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-cream/50 text-lg max-w-xl mx-auto">
            {siteContent.contactDesc}
          </motion.p>
        </div>
      </section>

      {/* Message form */}
      <section className="pt-20 pb-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="p-6 lg:p-10 rounded-3xl bg-white shadow-sm border border-sand/50 space-y-5">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">Send us a message</h2>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block space-y-2 text-sm font-medium text-charcoal">
                  Name
                  <input name="name" type="text" required maxLength={100} className={inputClass} />
                </label>
                <label className="block space-y-2 text-sm font-medium text-charcoal">
                  Email
                  <input name="email" type="email" required maxLength={200} className={inputClass} />
                </label>
              </div>
              <label className="block space-y-2 text-sm font-medium text-charcoal">
                Message
                <textarea name="message" required rows={5} maxLength={2000} className={inputClass} />
              </label>
              <div className="flex items-center gap-4">
                <Button type="submit" variant="terracotta" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'sent' && <span className="text-sm text-sage">Thanks, we will be in touch soon.</span>}
                {status === 'error' && <span className="text-sm text-red-500">{errorMessage}</span>}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Globe + Locations */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <GlobeMap />
            <div className="mt-8 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-charcoal">Our Locations</h3>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-lg">🇨🇳</span>
                <span className="font-medium text-charcoal">Shenzhen, China</span>
              </div>
            </div>
          </ScrollReveal>
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
