import { User } from "@/services/dotNetService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  loggedin: boolean;
  email?: string;
  username?: string;
};

const initialState: UserState = {
  loggedin: !!localStorage.getItem('NotesAppAuth'),
};

const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    updateLoginState: (state) => {
      state.loggedin = !!localStorage.getItem('NotesAppAuth');
      return state
    },
  },
});

export const { updateUser, updateLoginState } = userStateSlice.actions;
export type DatabaseActions = typeof userStateSlice.actions;
export default userStateSlice.reducer;