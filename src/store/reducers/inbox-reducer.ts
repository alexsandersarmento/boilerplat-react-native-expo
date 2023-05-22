import { createSlice } from '@reduxjs/toolkit'

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: {
    inboxMessages: [],
  },
  reducers: {
    setInboxMessages: (state, action) => {
      state.inboxMessages = action.payload
    },
  },
})

export const { setInboxMessages } = inboxSlice.actions

export default inboxSlice.reducer
