import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import contactSlice from './slices/contactSlice'
import groupSlice from './slices/groupSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contact: contactSlice,
    group: groupSlice
  }
})
