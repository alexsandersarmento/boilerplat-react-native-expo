import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoaded: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload
    },
  },
})

export const { setMessages, setIsLoaded } = chatSlice.actions

export default chatSlice.reducer
