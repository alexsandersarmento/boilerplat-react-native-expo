import { combineReducers } from '@reduxjs/toolkit'

import inboxReducer from './inbox-reducer'
import chatReducer from './chat-reducer'
import loadingReducer from './loading-reducer'
import lobbyReducer from './lobby-reducer'

export const rootReducer = combineReducers({
  loading: loadingReducer,
  inbox: inboxReducer,
  chat: chatReducer,
  lobby: lobbyReducer,
})

export * from './inbox-reducer'
export * from './chat-reducer'
export * from './loading-reducer'
export * from './lobby-reducer'
