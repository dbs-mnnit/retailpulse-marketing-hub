import { baseApi } from './baseApi';

export const storefrontApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStorefront: builder.query<any, string>({
      query: (slug) => `/storefront/${slug}`,
      providesTags: ['Storefront'],
      transformResponse: (response: any) => response.data,
    }),
    getStorefrontProducts: builder.query<any, string>({
      query: (slug) => `/storefront/${slug}/products`,
      providesTags: ['Storefront'],
      transformResponse: (response: any) => response.data,
    }),
    placeOrder: builder.mutation<any, { slug: string; orderData: any }>({
      query: ({ slug, orderData }) => ({
        url: `/storefront/${slug}/orders`,
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderQueue: builder.query<any, void>({
      query: () => '/storefront/orders/queue',
      providesTags: ['Order'],
      transformResponse: (response: any) => response.data,
    }),
    updateOrderStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/storefront/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetStorefrontQuery,
  useGetStorefrontProductsQuery,
  usePlaceOrderMutation,
  useGetOrderQueueQuery,
  useUpdateOrderStatusMutation,
} = storefrontApi;
