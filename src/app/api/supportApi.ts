import { baseApi } from './baseApi';

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    chatWithSupport: builder.mutation<any, { message: string; context: any }>({
      query: ({ message, context }) => ({
        url: '/support/chat',
        method: 'POST',
        body: {
          message,
          context,
          timestamp: new Date().toISOString(),
        },
      }),
    }),
    getKnowledge: builder.query<any, void>({
      query: () => '/support/knowledge',
      providesTags: ['Support'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useChatWithSupportMutation,
  useGetKnowledgeQuery,
} = supportApi;
