import { createSlice } from '@reduxjs/toolkit';
import {
  getData,
  getSingleData,
  postData,
  removeData,
  updateData,
} from './extraReducer';

const initialState = {
  loading: {
    post: false,
    update: false,
    delete: false,
    get: false,
  },
  data: [],
  success: '',
  singleData: {},
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.pending, state => {
        state.loading.get = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading.get = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.error.message;
      })
      .addCase(removeData.pending, (state, action) => {
        state.loading.delete = true;
        state.success = 'pending delete';
      })
      .addCase(removeData.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.success = 'success delete';
      })
      .addCase(removeData.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.error.message;
      })
      .addCase(postData.pending, (state, action) => {
        state.loading.post = true;
        state.success = 'post pending';
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading.post = false;
        state.success = 'post success';
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading.post = false;
        state.error = action.error.message;
      })
      .addCase(getSingleData.pending, state => {
        state.loading.update = true;
        state.success = 'pending get single data';
      })
      .addCase(getSingleData.fulfilled, (state, action) => {
        state.loading.update = false;
        state.success = 'det single data success';
        state.singleData = action.payload;
      })
      .addCase(getSingleData.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.error.message;
      })
      .addCase(updateData.pending, state => {
        state.loading.update = true;
        state.success = 'pending update';
      })
      .addCase(updateData.fulfilled, state => {
        state.loading.update = false;
        state.success = 'success updated';
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.error.message;
      });
  },
});

export const {} = educationSlice.actions;
export default educationSlice.reducer;
