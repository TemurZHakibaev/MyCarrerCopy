import { createSlice } from '@reduxjs/toolkit';
import { loginPost } from '../extraReducer';

const initialState = {
  loading: false,
  login: false,
  success: false,
  loggedIn: localStorage.getItem('token'),
  error: '',
  loading: {
    loginLoading: false,
  },
};

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginPost.pending, (state, action) => {
        state.loading.loginLoading = true;
        state.success = true;
        state.login = false;
        state.success = 'login pending';
      })
      .addCase(loginPost.fulfilled, (state, action) => {
        state.loading.loginLoading = false;
        state.success = true;
        state.login = true;
        localStorage.setItem('token', action.payload.data.token);
        state.success = 'login success';
      })
      .addCase(loginPost.rejected, (state, action) => {
        state.loading.loginLoading = false;
        state.error = action.error.message;
        state.login = false;
      });
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
