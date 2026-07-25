import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import brandReducer from './slices/brandSlice'
import userReducer from './slices/userSlice'
import wishlistReducer from './slices/wishlistSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
})
