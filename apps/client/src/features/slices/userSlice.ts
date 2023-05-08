import { User } from '@/types/Auth'
import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  value: null | User
}

const initialState: InitialState = {
  value: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: InitialState, { payload }: { payload: User }) => {
      state.value = payload
    },
    deleteUser: (state: InitialState) => {
      state.value = null
    },
  },
})

export const getUser = (state: { user: InitialState }) => state.user.value
export const { setUser, deleteUser } = userSlice.actions
export default userSlice.reducer
