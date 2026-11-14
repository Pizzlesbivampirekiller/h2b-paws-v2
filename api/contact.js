const API_VERSION = '2025-01'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let cachedToken = null
let tokenExpiresAt = 0

async function getAdminToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) return cachedToken

  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || !body.access_token) throw new Error(`Shopify token request failed: ${res.status}`)

  cachedToken = body.access_token
  tokenExpiresAt = Date.now() + (body.expires_in ?? 86400) * 1000
  return cachedToken
}

async function shopifyAdmin(path, options = {}) {
  const token = await getAdminToken()
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

function readField(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

async function sendContactEmail({ name, email, message }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New contact message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  })
  return res.ok
}

async function recordCustomer({ name, email, message }) {
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
  if (created.ok) return

  if (created.status === 422) {
    const search = await shopifyAdmin(`customers/search.json?query=${encodeURIComponent(`email:"${email}"`)}`)
    const existing = search.body.customers?.[0]
    if (existing) {
      const updatedNote = [existing.note, note].filter(Boolean).join('\n\n---\n\n')
      const updated = await shopifyAdmin(`customers/${existing.id}.json`, {
        method: 'PUT',
        body: JSON.stringify({ customer: { id: existing.id, note: updatedNote } }),
      })
      if (updated.ok) return
    }
  }

  console.error('Contact form: Shopify customer write failed', created.status, JSON.stringify(created.body))
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

  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_CLIENT_ID || !process.env.SHOPIFY_CLIENT_SECRET) {
    console.error('Contact form: SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET is missing')
    return res.status(500).json({ error: 'Contact form is not configured yet.' })
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    console.error('Contact form: RESEND_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is missing')
    return res.status(500).json({ error: 'Contact form is not configured yet.' })
  }

  const sent = await sendContactEmail({ name, email, message }).catch((err) => {
    console.error('Contact form: email request failed', err)
    return false
  })
  if (!sent) {
    console.error('Contact form: Resend did not accept the message')
    return res.status(502).json({ error: 'We could not send your message. Please try again shortly.' })
  }

  await recordCustomer({ name, email, message }).catch((err) => {
    console.error('Contact form: customer record failed', err)
  })
  return res.status(200).json({ ok: true })
}
