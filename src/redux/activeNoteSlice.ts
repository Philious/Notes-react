import { Note } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveNoteState = Note

const initialState: ActiveNoteState = {
  id: '',
  title: '',
  body: '',
  lastupdated: 0,
  created: 0
};

const activeNoteSlice = createSlice({
  name: 'activeNote',
  initialState,
  reducers: {
    setActiveNote: (_state, action: PayloadAction<Note>) => {
      return action.payload;
    },
    updateActiveNote: (state, action: PayloadAction<Partial<Note>>) => {
      return { ...state, ...action.payload }
    },
    clearActiveNote: () => initialState,
    newActiveNote: (_state, action: PayloadAction<Partial<Note> | undefined>) => {
      const date = new Date().valueOf();
      return ({ id: 'new', title: '', body: '', ...(action?.payload ?? {}), lastupdated: date, created: date })
    }
  }
});

export const { setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;