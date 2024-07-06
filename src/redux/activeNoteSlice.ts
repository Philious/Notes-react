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
    setActiveNote: (_state, action: PayloadAction<{  note: Note  }>) => {
      return action.payload.note;
    },
    updateActiveNote: (state,  action: PayloadAction<Partial<Note>>) => {
      return { ...state, ...action.payload }
    },
    clearActiveNote: () => initialState,
    newActiveNote: () => {
      const date = new Date().valueOf();
      return {  id: 'new', title: '', body: '', lastupdated: date, created: date }
    }
  }
});

export const { setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;