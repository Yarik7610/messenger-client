import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../api/axios'

const initialState = {
  login: null,
  nickname: null,
  _id: null,
  avatarPicture: null,
  token: window.localStorage.getItem('token'),
  isLoading: false,
  statusMsg: null,
  error: null
}

export const signupUser = createAsyncThunk('auth/signup', async (body, { rejectWithValue }) => {
  try {
    const { data } = await instance.post('/auth/signup', body)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data.message) //e.response.data == action.payload
  }
})

export const loginUser = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await instance.post('/auth/login', body)
    return data
  } catch (e) {
    return rejectWithValue(e.response.data.message)
  }
})

export const me = createAsyncThunk('auth/me', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

export const updatePhoto = createAsyncThunk('auth/updatePhoto', async (formData) => {
  const { data } = await instance.put('/user/updatePhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.login = null
      state.nickname = null
      state.token = null
      state._id = null
      state.avatarPicture = null
      state.isLoading = true
      state.statusMsg = null
      state.error = null
      window.localStorage.removeItem('token')
    },
    resetStatusMsg: (state) => {
      state.statusMsg = null
    }
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload.message
        state.error = null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload
        state.error = action.error
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.login = action.payload.login
        state.nickname = action.payload.nickname
        state._id = action.payload._id
        state.avatarPicture = action.payload.avatarPicture
        state.token = action.payload.token
        window.localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.statusMsg = action.payload
        state.error = action.error
      })

      //Me
      .addCase(me.pending, (state) => {
        state.isLoading = true
        state.statusMsg = null
        state.error = null
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.login = action.payload.login
        state.nickname = action.payload.nickname
        state._id = action.payload._id
        state.avatarPicture = action.payload.avatarPicture
        state.token = action.payload.token
        window.localStorage.setItem('token', action.payload.token)
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
        state.token = null
      })

      //updatePhoto
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.avatarPicture = action.payload.avatarPicture
      })
  }
})

export const { logout, resetStatusMsg } = authSlice.actions
export default authSlice.reducer
