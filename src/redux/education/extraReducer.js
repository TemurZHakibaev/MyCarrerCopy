import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'http://185.217.131.133:7152/api/education';
const token = localStorage.getItem('token');

//?~~~~~~~~~~~~~~~~~~getData~~~~~~~~~~~~~~~~~~~
export const getData = createAsyncThunk('education/get', async () => {
  return axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': `application/json`,
      Authorization: `bearer ${token}`,
    },
  }).then(res => res.data);
});

//?~~~~~~~~~~~~~~~~~deleteData~~~~~~~~~~~~~~~~~~~
export const removeData = createAsyncThunk('education/delete', async id => {
  return axios({
    method: 'DELETE',
    url: `${url}/${id}`,
    data: id,
    headers: {
      'Content-Type': `application/json`,
      Authorization: `bearer ${token}`,
    },
  }).then(res => res.data);
});

//?~~~~~~~~~~~~~~~~postData~~~~~~~~~~~~~~~~
export const postData = createAsyncThunk('educationPost', async payload => {
  return axios({
    method: 'POST',
    url: `${url}`,
    data: payload,
    headers: {
      'Content-Type': `application/json`,
      Authorization: `bearer ${token}`,
    },
  }).then(res => res.data);
});

//?~~~~~~~~~~~~~~~~getSingleData~~~~~~~~~~~
export const getSingleData = createAsyncThunk(
  'education/getSingleData',
  async id => {
    return axios({
      method: 'GET',
      url: `${url}/${id}`,
      data: id,
      headers: {
        'Content-Type': `application/json`,
        Authorization: `bearer ${token}`,
      },
    });
  },
);

//?~~~~~~~~~~~~~~~~updateData~~~~~~~~~~~~~~~
export const updateData = createAsyncThunk(
  'education/update',
  async payload => {
    return axios({
      method: 'PUT',
      url: `${url}/${payload.id}`,
      data: payload.data,
      headers: {
        'Content-Type': `application/json`,
        Authorization: `bearer ${token}`,
      },
    });
  },
);
