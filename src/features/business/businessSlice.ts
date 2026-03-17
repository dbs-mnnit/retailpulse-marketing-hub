import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BusinessState {
  currentId: string | null;
  businesses: Array<{ id: string; name: string; logo?: string }>;
}

const initialState: BusinessState = {
  currentId: localStorage.getItem('currentBusinessId') || 'biz_demo_001',
  businesses: [
    { id: 'biz_demo_001', name: 'Acme Retail Co.' },
  ],
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setCurrentBusiness: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
      localStorage.setItem('currentBusinessId', action.payload);
    },
    addBusiness: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.businesses.push(action.payload);
    },
  },
});

export const { setCurrentBusiness, addBusiness } = businessSlice.actions;
export default businessSlice.reducer;
