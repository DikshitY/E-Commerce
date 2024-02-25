import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'Products',
  initialState: {
    data: [],
    dummy: []
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setDummy(state, action){
        state.dummy = action.payload;
    },
    filterSearch(state, action) {
      state.data = state.dummy.filter((product) => {
        return product.name.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
  },
});

export const productsReducer = productSlice.reducer;
export const { filterSearch, setProducts, setDummy } = productSlice.actions;
