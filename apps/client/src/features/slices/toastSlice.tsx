import { Toast } from '@/types/Toast';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: Toast[];
};

const initialState: InitialState = {
  value: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToasts: (state, { payload }: { payload: Toast[] }) => {
      state.value = [...state.value, ...payload];
    },
    removeToast: (state, { payload }: { payload: number }) => {
      state.value = state.value.filter((toast, index: number) => index !== payload);
    },
  },
});

export const getToasts = (state: { toast: InitialState }) => state.toast.value;
export const { removeToast, addToasts } = toastSlice.actions;
export default toastSlice.reducer;
