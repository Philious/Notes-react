import { NetworkStatus } from "@/types/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusState = {
  status: NetworkStatus;
  error: string | null;
}

const initialState: StatusState = {
  status: NetworkStatus.IDLE,
  error: null,
};

const statusSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.status = action.payload;
      return state;
    },
    setError: (state, action: PayloadAction<NetworkStatus>) => {
      state.error = action.payload;
      return state;
    }
  }
});

export const { updateStatus } = statusSlice.actions;