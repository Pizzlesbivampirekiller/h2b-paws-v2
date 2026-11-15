import { motion } from 'framer-motion'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'

const SHIPPING = [
  {
    title: 'Order Processing',
    paragraphs: [
      'Except as otherwise stated on our website, orders will be processed as soon as possible.',
      "You'll receive a confirmation email with tracking as soon as your order ships, if the shipping method supports it.",
    ],
  },
  {
    title: 'Shipping Methods & Delivery Times',
    paragraphs: [
      'Available shipping methods and estimated delivery times are shown at checkout. Delivery times are estimates, not guarantees, and begin once your order ships. They may be affected by carrier delays, weather, or other events outside our control.',
    ],
  },
  {
    title: 'Shipping Costs',
    paragraphs: [
      'Shipping charges are calculated at checkout based on your destination, order weight, and selected shipping method. Free standard shipping may be available on selected orders as displayed at checkout.',
    ],
  },
  {
    title: 'Order Tracking',
    paragraphs: [
      'Once your order ships, we\'ll email you a confirmation with a tracking number and link, if applicable. Please note tracking information may take time to update after you receive it.',
    ],
  },
  {
    title: 'Shipping Destinations',
    paragraphs: [
      'We currently ship to Austria, Belgium, Bulgaria, Croatia, Cyprus, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hong Kong SAR, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, and United States.',
      'International orders may be subject to customs duties, import taxes, fees, and customs delays. Any applicable charges collected at checkout will be shown before you complete your purchase.',
    ],
  },
  {
    title: 'United Kingdom Customs & Taxes',
    paragraphs: [
      'For orders shipped to the United Kingdom, taxes, duties, and import fees may apply. Where available, these charges will be calculated and collected at checkout. If taxes or duties are collected at checkout, they will be shown before you place your order. If these charges are not collected at checkout, they may be due before or at delivery and are the customer\'s responsibility unless otherwise stated.',
      'In some cases, additional import charges, customs duties, VAT, brokerage fees, or carrier handling fees may be due when your order arrives in the United Kingdom. These charges are determined by UK customs authorities and/or the carrier and are the customer\'s responsibility unless we expressly state at checkout that duties and taxes are prepaid.',
      'Customs processing may also affect delivery times. We recommend checking your local import rules before placing an order.',
    ],
  },
  {
    title: 'European Union Customs & Taxes',
    paragraphs: [
      'Orders shipped to countries in the European Union may be subject to VAT, customs duties, import taxes, and carrier brokerage or handling fees. Where available, applicable taxes, duties, and import fees will be calculated and shown at checkout before you place your order. If these charges are not collected at checkout, they may be due before or at delivery and are the customer\'s responsibility unless otherwise stated.',
      'If checkout states that duties and taxes are prepaid, your order will be shipped with those charges prepaid and you should not be asked to pay additional import charges at delivery. If checkout does not state that duties and taxes are prepaid, you may be required to pay VAT, customs duties, import taxes, brokerage fees, or carrier handling fees before or at delivery.',
      'Import charges are determined by EU customs authorities and/or the carrier and may vary based on the destination country, product classification, product value, country of origin, and shipping method. Customs processing may also affect delivery times.',
    ],
  },
  {
    title: 'Address Accuracy',
    paragraphs: [
      'Please check your shipping address at checkout. Contact us as soon as possible if you need to correct it.',
    ],
  },
  {
    title: 'Lost, Damaged, or Delayed Packages',
    paragraphs: [
      'If your order is lost, damaged, or delayed, contact us and we will help you work with the carrier.',
    ],
  },
  {
    title: 'Order Changes & Cancellations',
    paragraphs: [
      'Need to change or cancel your order? Contact us as soon as possible. We may be able to accommodate changes before your order ships, but once it\'s in transit we\'re unable to modify it. Refunds for cancelled or delayed orders will be processed promptly to the original payment method where possible.',
    ],
  },
]

const RETURNS = [
  {
    title: 'Return Eligibility',
    paragraphs: [
      'Return eligibility depends on the items in your order.',
      'Where returns are accepted, items must be returned in the same condition they were received, unworn or unused, with tags, and in their original packaging or as otherwise indicated in the return instructions. We may reduce your refund if the item has been used, damaged, or handled more than necessary.',
    ],
  },
  {
    title: 'How to Start a Return',
    paragraphs: [
      'Contact us before returning an item to ask about return options and how to start a return. Whether return or cancellation requests are accepted depends on the terms above and your rights under applicable law.',
      'Unless we state otherwise or applicable law requires otherwise, you are responsible for return shipping costs for change-of-mind returns.',
    ],
  },
  {
    title: 'Damaged or Incorrect Items',
    paragraphs: [
      'Please inspect your order when you receive it and contact us immediately if an item is defective or damaged, or if you received the wrong item.',
    ],
  },
  {
    title: 'Non-Returnable Items',
    paragraphs: [
      'Some items may not be eligible for return, as stated in the return terms above or on the product listing, website, or in-store at the time of purchase. Contact us if you have questions about whether a specific item can be returned.',
    ],
  },
  {
    title: 'Exchanges',
    paragraphs: [
      'Contact us to ask about exchange options before returning your item.',
    ],
  },
  {
    title: 'European Union Cancellations',
    paragraphs: [
      'If you are a consumer in the European Union and purchase goods online, you may have the right to cancel your order within 14 days after the day you receive your goods, for any reason, unless an exemption applies.',
      'After you notify us that you wish to cancel, you must return the goods within 14 days. We will refund eligible cancelled orders within 14 days after we are informed of your cancellation, but we may withhold the refund until we receive the goods back or receive evidence that you have sent them back.',
      'For eligible cancellations, we will refund the product price and the cost of standard delivery, if you paid for delivery. We are not required to refund any additional amount paid for express or premium delivery beyond the cost of standard delivery.',
    ],
  },
  {
    title: 'United Kingdom Cancellations',
    paragraphs: [
      'If you are a consumer in the United Kingdom and purchase goods online, you may have the right to cancel your order within 14 days after the day you receive your goods, unless an exemption applies.',
      'After you tell us you wish to cancel, you must return the goods to us within 14 days. We will refund eligible cancelled orders within 14 days after we receive the returned goods or receive evidence that you have sent them back.',
      'For eligible cancellations, we will refund the product price and the cost of standard delivery, if you paid for delivery. We may not refund any additional amount paid for express or premium delivery beyond the cost of standard delivery.',
    ],
  },
  {
    title: 'Refunds',
    paragraphs: [
      'We will notify you after we receive and inspect your return and let you know whether the refund was approved. If approved, you will be refunded to your original payment method, unless otherwise stated. Your bank or payment provider may need additional time to process and post the refund.',
      'If you do not see your refund within a reasonable period of time since your refund was approved, contact us.',
      'This policy does not limit any rights you may have under applicable consumer protection laws, including rights that may apply if goods are defective, not as described, not delivered within the required or agreed timeframe, or otherwise do not comply with applicable law.',
    ],
  },
]

function PolicySection({ title, paragraphs }) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl font-semibold text-charcoal">{title}</h3>
      {paragraphs.map((p) => (
        <p key={p} className="text-charcoal/60 leading-relaxed">{p}</p>
      ))}
    </div>
  )
}

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta"
          >
            Support
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-semibold text-cream mt-4 mb-6"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cream/50 text-lg max-w-xl mx-auto"
          >
            Thank you for shopping with H2B Paws. Here is how we ship your order, what it costs, and how returns and refunds work.
          </motion.p>
          <p className="text-cream/30 text-sm mt-6">Last updated: November 15, 2026</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-14">
          <ScrollReveal>
            <SectionHeading subtitle="Shipping" title="Shipping Policy" />
          </ScrollReveal>
          {SHIPPING.map((section) => (
            <ScrollReveal key={section.title}>
              <PolicySection {...section} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-14">
          <ScrollReveal>
            <SectionHeading subtitle="Returns" title="Returns & Refunds" />
          </ScrollReveal>
          {RETURNS.map((section) => (
            <ScrollReveal key={section.title}>
              <PolicySection {...section} />
            </ScrollReveal>
          ))}
          <ScrollReveal>
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-charcoal">Contact</h3>
              <p className="text-charcoal/60 leading-relaxed">
                To request a cancellation, start a return, inquire about a return, ask about an exchange or report damaged items, email us at{' '}
                <a href="mailto:h2bpaws.contact@gmail.com" className="text-terracotta underline">h2bpaws.contact@gmail.com</a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
