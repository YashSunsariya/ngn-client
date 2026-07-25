import { createSlice } from '@reduxjs/toolkit'

const stored = JSON.parse(localStorage.getItem('ngn_wishlist') || '[]')

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: stored,
  },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload
      const idx = state.items.findIndex((i) => i._id === product._id)
      if (idx >= 0) {
        state.items.splice(idx, 1)
      } else {
        state.items.push({
          _id: product._id,
          productName: product.productName,
          images: product.images,
          price: product.price,
          discountPrice: product.discountPrice,
          brand: product.brand,
          stock: product.stock,
          category: product.category,
        })
      }
      localStorage.setItem('ngn_wishlist', JSON.stringify(state.items))
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i._id !== action.payload)
      localStorage.setItem('ngn_wishlist', JSON.stringify(state.items))
    },
    clearWishlist(state) {
      state.items = []
      localStorage.removeItem('ngn_wishlist')
    },
  },
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
