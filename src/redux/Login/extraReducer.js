import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const Login = 'http://185.217.131.133:7152/api/auth/login';

export const loginPost = createAsyncThunk('login/token', async payload => {
  return axios({
    method: 'POST',
    url: Login,
    data: {
      email: payload.email,
      password: payload.password,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
});
