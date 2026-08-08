import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }
  }

  const inputClasses = (field) =>
    `w-full px-0 py-3 text-base text-charcoal bg-transparent border-b-2 transition-colors outline-none ${
      errors[field]
        ? 'border-red-400'
        : focused === field
        ? 'border-terracotta'
        : 'border-sand'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-8">
        {['name', 'email'].map((field) => (
          <div key={field} className="relative">
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                form[field] || focused === field
                  ? '-top-5 text-xs text-terracotta'
                  : 'top-3 text-base text-charcoal/30'
              }`}
            >
              {field === 'name' ? 'Your Name' : 'Email Address'}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              onFocus={() => setFocused(field)}
              onBlur={() => setFocused(null)}
              className={inputClasses(field)}
            />
            {errors[field] && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">
                {errors[field]}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        <label
          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
            form.subject || focused === 'subject'
              ? '-top-5 text-xs text-terracotta'
              : 'top-3 text-base text-charcoal/30'
          }`}
        >
          Subject
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          onFocus={() => setFocused('subject')}
          onBlur={() => setFocused(null)}
          className={inputClasses('subject')}
        />
        {errors.subject && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">
            {errors.subject}
          </motion.p>
        )}
      </div>

      <div className="relative">
        <label
          className={`absolute left-0 transition-all duration-300 pointer-events-none ${
            form.message || focused === 'message'
              ? '-top-5 text-xs text-terracotta'
              : 'top-3 text-base text-charcoal/30'
          }`}
        >
          Your Message
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          className={`${inputClasses('message')} resize-none`}
        />
        {errors.message && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1">
            {errors.message}
          </motion.p>
        )}
      </div>

      <Button type="submit" variant="terracotta" size="lg" disabled={submitted}>
        {submitted ? (
          <>
            <CheckCircle size={18} />
            Message Sent!
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
