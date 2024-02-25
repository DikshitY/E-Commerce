import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    price: '',
    rating: '',
  },
  reducers: {
    changePrice(state, action) {
      state.price = action.payload === state.price ? '' : action.payload;
    },
    changeRating(state, action) {
      state.rating = action.payload === state.rating ? '' : action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changePrice, changeRating } = filterSlice.actions;
