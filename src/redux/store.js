import { configureStore, combineReducers } from '@reduxjs/toolkit'
import burgerSlice from './slices/burgerSlice';
import playerSlice from './slices/playerSlice';

const rootReducer = combineReducers({
  burgerState: burgerSlice,
  playerState: playerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});