import { Link } from 'react-router-dom'
import { Camera, MessageCircle, Film } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'All Products', path: '/shop' },
  ],
  Company: [
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/contact' },
  ],
  Support: [
    { label: 'Shipping & Returns', path: '/support' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 cursor-pointer">
              <img src="/logo.png" alt="H2B Paws" className="h-6 w-auto" />
              <span className="font-serif text-xl font-semibold text-cream">H2B Paws</span>
            </Link>
            <p className="text-cream/40 text-sm leading-relaxed mb-6">
              Simple cooling gear for dogs. Just add water and keep your dog comfortable when the weather turns warm.
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
                    <Link to={link.path} className="text-sm text-cream/40 hover:text-terracotta transition-colors cursor-pointer">
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
            <Link to="/privacy" className="hover:text-cream/50 transition-colors cursor-pointer">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cream/50 transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
