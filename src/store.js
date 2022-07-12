import { configureStore } from '@reduxjs/toolkit';
import tradeReducer from './slices';

export const store = configureStore({
  reducer: {
    trade: tradeReducer,
  },
});
