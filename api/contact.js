const API_VERSION = '2025-01'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function shopifyAdmin(path, options = {}) {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
    },
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

function readField(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body || {}
  if (body.company) return res.status(200).json({ ok: true })

  const name = readField(body.name, 100)
  const email = readField(body.email, 200)
  const message = readField(body.message, 2000)
  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and a message.' })
  }

  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_TOKEN) {
    console.error('Contact form: SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN is missing')
    return res.status(500).json({ error: 'Contact form is not configured yet.' })
  }

  const [firstName, ...rest] = name.split(/\s+/)
  const note = `Contact form, ${new Date().toISOString()}\n\n${message}`

  const created = await shopifyAdmin('customers.json', {
    method: 'POST',
    body: JSON.stringify({
      customer: {
        first_name: firstName,
        last_name: rest.join(' '),
        email,
        tags: 'contact-form',
        note,
        accepts_marketing: false,
      },
    }),
  })
  if (created.ok) return res.status(201).json({ ok: true })

  if (created.status === 422) {
    const search = await shopifyAdmin(`customers/search.json?query=${encodeURIComponent(`email:"${email}"`)}`)
    const existing = search.body.customers?.[0]
    if (existing) {
      const updatedNote = [existing.note, note].filter(Boolean).join('\n\n---\n\n')
      const updated = await shopifyAdmin(`customers/${existing.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({ customer: { id: existing.id, note: updatedNote } }),
      })
      if (updated.ok) return res.status(200).json({ ok: true })
    }
  }

  console.error('Contact form: Shopify customer write failed', created.status, JSON.stringify(created.body))
  return res.status(502).json({ error: 'We could not send your message. Please try again shortly.' })
}
