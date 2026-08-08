import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize && item.selectedColor === action.payload.selectedColor
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existing.id && item.selectedSize === existing.selectedSize && item.selectedColor === existing.selectedColor
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, i) => i !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item, i) =>
          i === action.payload.index ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const initialState = { items: [] }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    try {
      const stored = localStorage.getItem('h2b-cart')
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem('h2b-cart', JSON.stringify(state))
  }, [state])

  const addItem = (product, selectedSize, selectedColor) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedSize, selectedColor } })
  const removeItem = (index) => dispatch({ type: 'REMOVE_ITEM', payload: index })
  const updateQuantity = (index, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
