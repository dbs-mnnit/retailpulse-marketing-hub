import { baseApi } from './baseApi';

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffPerformance: builder.query<any, string>({
      query: (businessId) => ({
        url: '/team/performance',
        params: { businessId },
      }),
      providesTags: ['StaffPerformance'],
      transformResponse: (response: any) => response.data,
    }),
    getStaffMembers: builder.query<any, string>({
      query: (businessId) => ({
        url: '/team',
        params: { businessId },
      }),
      providesTags: ['Staff'],
      transformResponse: (response: any) => response.data,
    }),
    generatePayslips: builder.mutation<any, { businessId: string; month: string }>({
      query: (data) => ({
        url: '/team/payslips',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetStaffPerformanceQuery,
  useGetStaffMembersQuery,
  useGeneratePayslipsMutation,
} = staffApi;
