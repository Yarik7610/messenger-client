import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../api/axios'

const initialState = {
  groups: []
}

export const getGroups = createAsyncThunk('group/getGroups', async () => {
  const { data } = await instance.get('/group')
  return data
})
export const createGroup = createAsyncThunk('group/createGroup', async (body) => {
  const { data } = await instance.post('/group', body)
  return data
})
export const exitGroup = createAsyncThunk('group/exitGroup', async (groupId) => {
  const { data } = await instance.delete(`/group/${groupId}`)
  return data
})

const contactSlice = createSlice({
  name: 'group',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload)
      })
      .addCase(exitGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((g) => g._id !== action.payload.groupId)
      })
  }
})
export default contactSlice.reducer
