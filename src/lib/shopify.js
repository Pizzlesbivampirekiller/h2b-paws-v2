const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'kfdxq3-eb.myshopify.com'
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '4bedfaae968e91fc20ebc485891a316e'
const ENDPOINT = `https://${STORE_DOMAIN}/api/2025-01/graphql.json`

export async function storefront(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (!res.ok || json.errors) {
    throw new Error(json.errors?.[0]?.message || `Storefront API ${res.status}`)
  }
  return json.data
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  featuredImage { url altText }
  images(first: 6) { edges { node { url altText } } }
  options { name values }
  variants(first: 100) {
    edges {
      node {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
      }
    }
  }
`

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            selectedOptions { name value }
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`

const flattenEdges = (conn) => (conn?.edges || []).map((e) => e.node)

export function normalizeProduct(p) {
  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    description: p.description,
    available: p.availableForSale,
    price: Number(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
    image: p.featuredImage?.url,
    images: flattenEdges(p.images).map((img) => img.url),
    options: p.options.filter((o) => o.name !== 'Title'),
    variants: flattenEdges(p.variants).map((v) => ({
      id: v.id,
      title: v.title,
      available: v.availableForSale,
      price: Number(v.price.amount),
      selectedOptions: v.selectedOptions,
    })),
  }
}

export function normalizeCart(cart) {
  if (!cart) return null
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: Number(cart.cost.subtotalAmount.amount),
    lines: flattenEdges(cart.lines).map((line) => ({
      id: line.id,
      quantity: line.quantity,
      variantId: line.merchandise.id,
      title: line.merchandise.product.title,
      handle: line.merchandise.product.handle,
      variantTitle: line.merchandise.title,
      price: Number(line.merchandise.price.amount),
      image: line.merchandise.image?.url,
      selectedOptions: line.merchandise.selectedOptions,
    })),
  }
}

export async function fetchProducts() {
  const data = await storefront(`
    query Products($first: Int!) {
      products(first: $first) { edges { node { ${PRODUCT_FIELDS} } } }
    }
  `, { first: 50 })
  return flattenEdges(data.products).map(normalizeProduct)
}

export async function fetchProductByHandle(handle) {
  const data = await storefront(`
    query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }
  `, { handle })
  return data.product ? normalizeProduct(data.product) : null
}

export async function fetchCart(cartId) {
  const data = await storefront(`
    query Cart($id: ID!) {
      cart(id: $id) { ${CART_FIELDS} }
    }
  `, { id: cartId })
  return normalizeCart(data.cart)
}

function assertNoUserErrors(payload) {
  const errors = payload.userErrors || []
  if (errors.length) throw new Error(errors[0].message)
}

export async function createCart(lines = []) {
  const data = await storefront(`
    mutation CartCreate($input: CartInput) {
      cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { field message } }
    }
  `, { input: { lines } })
  assertNoUserErrors(data.cartCreate)
  return normalizeCart(data.cartCreate.cart)
}

export async function addCartLine(cartId, variantId, quantity = 1) {
  const data = await storefront(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] })
  assertNoUserErrors(data.cartLinesAdd)
  return normalizeCart(data.cartLinesAdd.cart)
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await storefront(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] })
  assertNoUserErrors(data.cartLinesUpdate)
  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function removeCartLine(cartId, lineId) {
  const data = await storefront(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { field message } }
    }
  `, { cartId, lineIds: [lineId] })
  assertNoUserErrors(data.cartLinesRemove)
  return normalizeCart(data.cartLinesRemove.cart)
}
