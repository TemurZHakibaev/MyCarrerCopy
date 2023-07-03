import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../redux/Login/LoginSlice/loginSlice';
import educationSlice from './education/educationSlice';

const store = configureStore({
  reducer: {
    login: LoginSlice,
    education: educationSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
