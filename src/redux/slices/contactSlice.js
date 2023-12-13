import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../api/axios'

const initialState = {
  contacts: []
}

export const getContacts = createAsyncThunk('contact/getContacts', async () => {
  const { data } = await instance.get('/contact')
  return data
})
export const addContact = createAsyncThunk('contact/addContact', async (contactId) => {
  const { data } = await instance.post('/contact', contactId)
  return data
})
export const removeContact = createAsyncThunk('contact/removeContact', async (contactId) => {
  const { data } = await instance.delete(`/contact/${contactId}`)
  return data
})

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload)
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((c) => c._id !== action.payload.contactId)
      })
  }
})
export default contactSlice.reducer
