import { baseApi } from './baseApi';

export const procurementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Vendors ===
    getVendors: builder.query<any, string>({
      query: (businessId) => ({
        url: '/vendors',
        params: { businessId },
      }),
      providesTags: ['Vendor'],
      transformResponse: (response: any) => response.data,
    }),
    addVendor: builder.mutation<any, { businessId: string; name: string; contactPerson?: string; phone?: string; category?: string }>({
      query: (data) => ({
        url: '/vendors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Vendor'],
      transformResponse: (response: any) => response.data,
    }),

    // === Purchase Orders ===
    getPurchaseOrders: builder.query<any, string>({
      query: (businessId) => ({
        url: '/ops/procurement/orders',
        params: { businessId },
      }),
      providesTags: ['PurchaseOrder'],
      transformResponse: (response: any) => response.data,
    }),
    suggestPOs: builder.mutation<any, string>({
      query: (businessId) => ({
        url: '/ops/procurement/suggest',
        params: { businessId },
      }),
      transformResponse: (response: any) => response.data,
    }),
    sendPO: builder.mutation<any, { businessId: string; vendorId: string; items: any[] }>({
      query: (data) => ({
        url: '/ops/procurement/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PurchaseOrder'],
      transformResponse: (response: any) => response.data,
    }),

    // === Logistics / Shipping Rates ===
    calculateShipping: builder.mutation<any, { provider: string; weight: number; origin: string; destination: string }>({
      query: (data) => ({
        url: '/ops/logistics/rates',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useAddVendorMutation,
  useGetPurchaseOrdersQuery,
  useSuggestPOsMutation,
  useSendPOMutation,
  useCalculateShippingMutation,
} = procurementApi;
