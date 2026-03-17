import { baseApi } from '../../app/api/baseApi';

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarginAnalysis: builder.query<any, void>({
      query: () => '/studio/margin-analysis',
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
    getDemandPrediction: builder.query<any, void>({
      query: () => '/studio/demand-prediction',
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
    getCustomerSegments: builder.query<any, void>({
      query: () => '/segments',
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
    getBusinessInsights: builder.query<any, void>({
      query: () => '/ai/business-insights',
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
    generateCopy: builder.mutation<any, { type: string; prompt: string }>({
      query: (data) => ({
        url: '/ai/generate-copy',
        method: 'POST',
        body: data,
      }),
    }),
    generateBanner: builder.mutation<any, string>({
      query: (goal) => ({
        url: '/studio/banner',
        method: 'POST',
        body: { goal },
      }),
    }),
    runSimulation: builder.mutation<any, { params: any }>({
      query: (data) => ({
        url: '/intelligence/simulate',
        method: 'POST',
        body: data,
      }),
    }),

    // Additional endpoints (previously only in ai.service.ts)
    generateProductDescription: builder.mutation<any, { productName: string; category: string; features: string[] }>({
      query: (data) => ({
        url: '/ai/product-description',
        method: 'POST',
        body: data,
      }),
    }),
    getSmartPricing: builder.query<any, string>({
      query: (productId) => `/ai/smart-pricing/${productId}`,
      transformResponse: (response: any) => response.data,
    }),
    getCampaignInsights: builder.query<any, string>({
      query: (campaignId) => `/ai/campaign-insights/${campaignId}`,
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
    generateABTests: builder.mutation<any, string>({
      query: (baseCopy) => ({
        url: '/studio/ab-tests',
        method: 'POST',
        body: { baseCopy },
      }),
    }),
    getAICustomerSegments: builder.query<any, void>({
      query: () => '/ai/customer-segments',
      providesTags: ['Analytics'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetMarginAnalysisQuery,
  useGetDemandPredictionQuery,
  useGetCustomerSegmentsQuery,
  useGetBusinessInsightsQuery,
  useGenerateCopyMutation,
  useGenerateBannerMutation,
  useRunSimulationMutation,
  useGenerateProductDescriptionMutation,
  useGetSmartPricingQuery,
  useGetCampaignInsightsQuery,
  useGenerateABTestsMutation,
  useGetAICustomerSegmentsQuery,
} = aiApi;
