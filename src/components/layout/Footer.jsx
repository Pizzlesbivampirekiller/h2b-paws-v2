import { Link } from 'react-router-dom'
import { PawPrint, Camera, MessageCircle, Film, Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const footerLinks = {
  Shop: [
    { label: 'All Products', path: '/shop' },
    { label: 'Collars & Leashes', path: '/shop?category=accessories' },
    { label: 'Beds & Mats', path: '/shop?category=beds' },
    { label: 'Food & Treats', path: '/shop?category=food' },
    { label: 'Clothing', path: '/shop?category=clothing' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Sustainability', path: '/about' },
    { label: 'Careers', path: '/contact' },
  ],
  Support: [
    { label: 'FAQ', path: '/contact' },
    { label: 'Shipping', path: '/contact' },
    { label: 'Returns', path: '/contact' },
    { label: 'Size Guide', path: '/contact' },
    { label: 'Track Order', path: '/contact' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => { setSubscribed(false); setEmail('') }, 3000)
    }
  }

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-16 lg:py-20 border-b border-cream/10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl lg:text-4xl text-cream mb-4"
            >
              Join the H2B Pack
            </motion.h2>
            <p className="text-cream/50 mb-8">
              Subscribe for early access to new collections, exclusive offers, and pet care insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cream/10 rounded-full text-cream placeholder:text-cream/30 focus:outline-none focus:border-terracotta/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta-dark transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                {subscribed ? '✓ Subscribed!' : <><span>Subscribe</span> <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 cursor-pointer">
              <PawPrint size={24} className="text-terracotta" />
              <span className="font-serif text-xl font-semibold text-cream">H2B Paws</span>
            </Link>
            <p className="text-cream/40 text-sm leading-relaxed mb-6">
              Luxury pet essentials for the modern companion. Crafted with care, designed to last.
            </p>
            <div className="flex gap-3">
              {[Camera, MessageCircle, Film].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-terracotta text-cream/50 hover:text-cream transition-all cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-cream font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-cream/40 hover:text-terracotta transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/30">
          <p>© 2026 H2B Paws. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream/50 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-cream/50 transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
