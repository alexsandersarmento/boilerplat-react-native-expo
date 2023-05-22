import { createSlice } from '@reduxjs/toolkit'

const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {
    availableUsers: [],
  },
  reducers: {
    setAvailableUsers: (state, action) => {
      state.availableUsers = action.payload
    },
  },
})

export const { setAvailableUsers } = lobbySlice.actions

export default lobbySlice.reducer
