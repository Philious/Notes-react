import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type LoginState = {
  loading: boolean;
  user?: User;
}

const initialState: LoginState = {
  loading: false,
  user: undefined
};

const activeNoteSlice = createSlice({
  name: 'activeNote',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  }
});

export const { setLoading, setUser } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;