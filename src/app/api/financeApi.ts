import { baseApi } from './baseApi';

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Expenses ===
    getExpenses: builder.query<any, string>({
      query: (businessId) => ({
        url: '/finance/expenses',
        params: { businessId },
      }),
      providesTags: ['Expense'],
      transformResponse: (response: any) => response.data,
    }),
    addExpense: builder.mutation<any, { businessId: string; description: string; amount: number; category: string; date?: string }>({
      query: (data) => ({
        url: '/finance/expenses',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Expense'],
      transformResponse: (response: any) => response.data,
    }),
    uploadReceipt: builder.mutation<any, { businessId: string; file: File }>({
      query: ({ businessId, file }) => {
        const formData = new FormData();
        formData.append('receipt', file);
        formData.append('businessId', businessId);
        return {
          url: '/finance/ocr-receipt',
          method: 'POST',
          body: formData,
          // Let browser set Content-Type with boundary
          formData: true,
        };
      },
      invalidatesTags: ['Expense'],
      transformResponse: (response: any) => response.data,
    }),

    // === Income Statement / P&L ===
    getIncomeStatement: builder.query<any, string>({
      query: (businessId) => ({
        url: '/finance/income-statement',
        params: { businessId },
      }),
      providesTags: ['IncomeStatement'],
      transformResponse: (response: any) => response.data,
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // === Cash Flow Forecast ===
    getCashFlowForecast: builder.query<any, string>({
      query: (businessId) => ({
        url: '/finance/cash-flow',
        params: { businessId },
      }),
      providesTags: ['CashFlow'],
      transformResponse: (response: any) => response.data,
    }),

    // === Data Room / Lender Packet ===
    generateDataRoom: builder.mutation<Blob, string>({
      query: (businessId) => ({
        url: '/finance/data-room',
        params: { businessId },
        responseHandler: (response: Response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUploadReceiptMutation,
  useGetIncomeStatementQuery,
  useGetCashFlowForecastQuery,
  useGenerateDataRoomMutation,
} = financeApi;
