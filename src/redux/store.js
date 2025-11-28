import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import achievementReducer from './slices/achievementSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    achievements: achievementReducer,
    theme: themeReducer,
  },
});

export default store;
