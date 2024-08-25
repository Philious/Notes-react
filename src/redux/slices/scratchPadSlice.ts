import { createSlice } from "@reduxjs/toolkit";
import { fetchScratch, updateScratch } from "@/redux/thunks/asyncScratchThunk";
import addCommonCases from "@/redux/commonCase";
import { NetworkStatus } from "@/types/enums";

export type NotesState = {
  scratch: { content: string, updatedAt: string | null };
  status: NetworkStatus;
  error: string | null;
}

const initialState: NotesState = {
  scratch: { content: '', updatedAt: null },
  status: NetworkStatus.IDLE,
  error: null,
};

const scratchSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCommonCases(builder, fetchScratch, (state, action) => {
      if (action.payload) {
        state.scratch = { ...action.payload };
      }
    });
    addCommonCases(builder, updateScratch, (state, action) => {
      if (action.payload) {
        state.scratch = action.payload;
      }
    });
  },
});

// export const { clearAllNotes } = scratchSlice.actions;
export type DatabaseActions = typeof scratchSlice.actions;
export default scratchSlice.reducer;
