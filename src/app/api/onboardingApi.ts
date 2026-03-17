import { baseApi } from './baseApi';

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeOnboardingStep: builder.mutation<any, { step: string; data: any }>({
      query: ({ step, data }) => ({
        url: '/auth/onboarding-step',
        method: 'POST',
        body: { step, data },
      }),
      invalidatesTags: ['Onboarding'],
    }),
    sendVerification: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/send-verification-code',
        method: 'POST',
      }),
    }),
    verifyEmail: builder.mutation<any, string>({
      query: (code) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { code },
      }),
    }),
  }),
});

export const {
  useCompleteOnboardingStepMutation,
  useSendVerificationMutation,
  useVerifyEmailMutation,
} = onboardingApi;
