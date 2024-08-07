import { createSlice } from "@reduxjs/toolkit";
import { fetchScratch, addScratch, updateScratch } from "@/redux/thunks/asyncScratchThunk";
import addCommonCases from "@/redux/utils";
import { NetworkStatus } from "@/types/enums";

export type NotesState = {
  scratch: Record<'content', string>;
  status: NetworkStatus;
  error: string | null;
}

const initialState: NotesState = {
  scratch: { content: '' },
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
    addCommonCases(builder, addScratch, (state, action) => {
      if (action.payload) {
        state.scratch = action.payload;
      }
    });
    addCommonCases(builder, updateScratch, (state, action) => {
      if (state.scratch) {
        state.scratch = action.payload;
      }
    });
  },
});

// export const { clearAllNotes } = scratchSlice.actions;
export type DatabaseActions = typeof scratchSlice.actions;
export default scratchSlice.reducer;
