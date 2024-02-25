import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartApi } from './apis/cartApi';
import { userReducer, setToken, setUser } from './slices/userSlice';
import { searchTermReducer, changeSearchTerm } from './slices/searchTermSlice';
import {
  filterReducer,
  changePrice,
  changeRating,
} from './slices/filterSlice';
import {
  productsReducer,
  filterSearch,
  setProducts,
  setDummy,
} from './slices/productsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    searchTerm: searchTermReducer,
    filter: filterReducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  setToken,
  setUser,
  changePrice,
  changeRating,
  changeSearchTerm,
  filterSearch,
  setProducts,
  setDummy,
};
export {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useDeleteItemFromCartMutation,
  useDeleteSingleItemFromCartMutation,
  cartApi,
} from './apis/cartApi';
