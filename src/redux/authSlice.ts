import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  error: string;
  auth: string | null;
  user: string | null
}

const initialState: AuthState = {
  error: '',
  auth: null,
  user: null,
};

const initialFetchSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => { state.error = action.payload; },
    setAuth: (state, action: PayloadAction<string | null>) => { state.auth = action.payload; },
    setUser: (state, action: PayloadAction<string | null>) => { state.user = action.payload; },
  }
});

export const { setUser, setAuth, setError } = initialFetchSlice.actions;
export type InitialFetchActions = typeof initialFetchSlice.actions;
export default initialFetchSlice.reducer;
