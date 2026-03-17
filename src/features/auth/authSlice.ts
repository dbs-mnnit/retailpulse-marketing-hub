import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: { id: string; name: string; email: string; avatar?: string } | null;
  isAuthenticated: boolean;
}

const storedToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');
const storedUser = localStorage.getItem('user');

const safeParse = (str: string | null) => {
  if (!str || str === 'undefined' || str === 'null') return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

const initialState: AuthState = {
  token: storedToken,
  refreshToken: storedRefreshToken,
  user: safeParse(storedUser),
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      // Clear persisted data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('currentBusinessId');
    },
  },
});

export const { setCredentials, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
