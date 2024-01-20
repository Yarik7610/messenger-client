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
export const changeAdmin = createAsyncThunk('group/changeAdmin', async (body) => {
  const { data } = await instance.put(`/group/changeAdmin/${body.groupId}`, {
    member: body.member
  })
  return data
})
export const addMembers = createAsyncThunk('group/addMembers', async (body) => {
  const { data } = await instance.put(`/group/${body.groupId}`, {
    newMembers: body.newMembers
  })
  return data
})
export const kickMember = createAsyncThunk('group/kickMember', async (body) => {
  const { data } = await instance.delete(`/group/${body.groupId}/kick/${body.memberId}`)
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
      .addCase(changeAdmin.fulfilled, (state, action) => {
        let group = state.groups.find((g) => g._id === action.payload._id)
        if (group) group.admin = action.payload.admin
      })
      .addCase(addMembers.fulfilled, (state, action) => {
        let group = state.groups.find((g) => g._id === action.payload._id)
        if (group) group.members = group.members.concat(action.payload.newMembers)
      })
      .addCase(kickMember.fulfilled, (state, action) => {
        let group = state.groups.find((g) => g._id === action.payload._id)
        if (group)
          group.members = group.members.filter((member) => member._id !== action.payload.memberId)
      })
  }
})
export default contactSlice.reducer
