import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartApi = createApi({
  reducerPath: 'cart',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        // Handle the case where the user is not authenticated
        return { data: null };
      } else {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      addItemToCart: builder.mutation({
        invalidatesTags: ['Cart'],
        query: (p_id) => {
          return {
            url: `/cart/${p_id}`,
            method: 'POST',
          };
        },
      }),
      deleteItemFromCart: builder.mutation({
        invalidatesTags: ['Cart'],
        query: (id) => {
          return {
            url: `/cart/${id}`,
            method: 'DELETE',
          };
        },
      }),
      deleteSingleItemFromCart: builder.mutation({
        invalidatesTags: ['Cart'],
        query: (id) => {
          return {
            url: `/cart/${id}`,
            method: 'PATCH'
          }
        }
      }),
      fetchCart: builder.query({
        providesTags: ['Cart'],
        query: () => {
          return {
            url: '/cart',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export { cartApi };
export const {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useDeleteItemFromCartMutation,
  useDeleteSingleItemFromCartMutation
} = cartApi;