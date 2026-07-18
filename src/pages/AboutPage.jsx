import { motion } from 'framer-motion'
import { team } from '../data/team'
import Timeline from '../components/about/Timeline'
import TeamCard from '../components/about/TeamCard'
import StatCounter from '../components/about/StatCounter'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1920&h=800&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl lg:text-6xl font-semibold text-cream mt-4 mb-6 leading-tight"
          >
            Crafting luxury for
            <br />
            the modern companion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-cream/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Born from a belief that pets deserve the same quality and beauty we expect for ourselves.
            Every H2B Paws piece blends Italian craftsmanship with uncompromising standards for comfort and durability.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Stats */}
      <StatCounter />

      {/* Team */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            subtitle="Meet the Pack"
            title="The People Behind H2B"
            description="A passionate team united by love for animals and beautiful design."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Stand For"
            title="Our Values"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Craftsmanship', desc: 'Every stitch, every edge, every material is chosen with intention. We work with generational artisans who treat their craft as art.' },
              { title: 'Sustainability', desc: 'Carbon-neutral operations, ethically-sourced materials, and packaging that leaves no trace. Luxury should never cost the earth.' },
              { title: 'Community', desc: 'We\'re building more than a brand — we\'re building a community of pet parents who believe their companions deserve the extraordinary.' },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <div className="p-6 rounded-2xl bg-cream border border-sand/50">
                  <span className="text-3xl mb-4 block">
                    {['🎨', '🌍', '💛'][i]}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">{value.title}</h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
