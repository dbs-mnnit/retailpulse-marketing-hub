import { baseApi } from './baseApi';

export const intelligenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Reviews ===
    getReviews: builder.query<any, string>({
      query: (businessId) => ({
        url: '/intelligence/reviews',
        params: { businessId },
      }),
      providesTags: ['Review'],
      transformResponse: (response: any) => response.data,
    }),
    getReviewStats: builder.query<any, string>({
      query: (businessId) => ({
        url: '/intelligence/reviews/stats',
        params: { businessId },
      }),
      providesTags: ['ReviewStats'],
      transformResponse: (response: any) => response.data,
    }),
    addReview: builder.mutation<any, { businessId: string; customerName: string; rating: number; text?: string }>({
      query: (data) => ({
        url: '/intelligence/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review', 'ReviewStats'],
      transformResponse: (response: any) => response.data,
    }),
    replyToReview: builder.mutation<any, { id: string; reply: string }>({
      query: ({ id, reply }) => ({
        url: `/intelligence/reviews/${id}/reply`,
        method: 'PATCH',
        body: { reply },
      }),
      invalidatesTags: ['Review'],
      transformResponse: (response: any) => response.data,
    }),

    // === Credit Score ===
    getCreditScore: builder.query<any, string>({
      query: (businessId) => ({
        url: '/intelligence/credit-score',
        params: { businessId },
      }),
      providesTags: ['CreditScore'],
      transformResponse: (response: any) => response.data,
      keepUnusedDataFor: 300,
    }),

    // === Simulation ===
    runIntelligenceSimulation: builder.mutation<any, { businessId: string; params: { priceChange: number; discountChange: number; volumeChange: number; cogsChange: number } }>({
      query: (data) => ({
        url: '/intelligence/simulation',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),

    // === Growth Agent ===
    getExperiments: builder.query<any, string>({
      query: (businessId) => ({
        url: '/intelligence/growth-agent',
        params: { businessId },
      }),
      providesTags: ['Experiment'],
      transformResponse: (response: any) => response.data,
    }),
    suggestExperiment: builder.mutation<any, string>({
      query: (businessId) => ({
        url: '/intelligence/growth-agent/suggest',
        method: 'POST',
        body: { businessId },
      }),
      invalidatesTags: ['Experiment'],
      transformResponse: (response: any) => response.data,
    }),
    activateExperiment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/intelligence/growth-agent/${id}/activate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Experiment'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewStatsQuery,
  useAddReviewMutation,
  useReplyToReviewMutation,
  useGetCreditScoreQuery,
  useRunIntelligenceSimulationMutation,
  useGetExperimentsQuery,
  useSuggestExperimentMutation,
  useActivateExperimentMutation,
} = intelligenceApi;
