import { createContext, useContext, useEffect, useState } from 'react'
import { addCartLine, createCart, fetchCart, removeCartLine, updateCartLine } from '../lib/shopify'

const CartContext = createContext()
const CART_ID_KEY = 'h2b-cart-id'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    fetchCart(cartId)
      .then((stored) => {
        if (stored) setCart(stored)
        else localStorage.removeItem(CART_ID_KEY)
      })
      .catch((e) => console.error('Cart restore failed:', e))
  }, [])

  const applyCart = (next) => {
    if (next) localStorage.setItem(CART_ID_KEY, next.id)
    else localStorage.removeItem(CART_ID_KEY)
    setCart(next)
  }

  const addItem = async (variantId, quantity = 1) => {
    const next = cart
      ? await addCartLine(cart.id, variantId, quantity)
      : await createCart([{ merchandiseId: variantId, quantity }])
    applyCart(next)
  }

  const updateQuantity = async (lineId, quantity) => {
    if (quantity < 1) return removeItem(lineId)
    applyCart(await updateCartLine(cart.id, lineId, quantity))
  }

  const removeItem = async (lineId) => {
    applyCart(await removeCartLine(cart.id, lineId))
  }

  const clearCart = () => applyCart(null)

  const value = {
    items: cart?.lines ?? [],
    itemCount: cart?.totalQuantity ?? 0,
    subtotal: cart?.subtotal ?? 0,
    checkoutUrl: cart?.checkoutUrl ?? null,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
