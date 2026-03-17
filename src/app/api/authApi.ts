import { baseApi } from '../../app/api/baseApi';
import { setCredentials, setRefreshToken, logout } from '../../features/auth/authSlice';
import { setCurrentBusiness } from '../../features/business/businessSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const authData = (data as any).data;

          dispatch(setCredentials({ token: authData.accessToken, user: authData.user }));
          dispatch(setRefreshToken(authData.refreshToken));

          // Persist for hydration on page reload
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          localStorage.setItem('user', JSON.stringify(authData.user));

          if (authData.currentBusinessId) {
            dispatch(setCurrentBusiness(authData.currentBusinessId));
          }
        } catch (err) {
          // Error handled by component
        }
      },
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const authData = (data as any).data;

          dispatch(setCredentials({ token: authData.accessToken, user: authData.user }));
          dispatch(setRefreshToken(authData.refreshToken));

          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          localStorage.setItem('user', JSON.stringify(authData.user));
        } catch (err) {
          // Error handled by component
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        // Dispatch logout immediately regardless of API response
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        try {
          await queryFulfilled;
        } catch {
          // Logout locally even if API call fails
        }
      },
    }),
    googleLogin: builder.mutation({
      query: (token) => ({
        url: '/auth/google',
        method: 'POST',
        body: { token },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const authData = (data as any).data;

          dispatch(setCredentials({ token: authData.accessToken, user: authData.user }));
          dispatch(setRefreshToken(authData.refreshToken));

          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          localStorage.setItem('user', JSON.stringify(authData.user));

          if (authData.currentBusinessId) {
            dispatch(setCurrentBusiness(authData.currentBusinessId));
          }
        } catch (err) {
          // Error handled by component
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutUserMutation, useGoogleLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
