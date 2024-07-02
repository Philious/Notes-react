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
    getActiveNote: (state) => state,
    setActiveNote: (state, action: PayloadAction<{  note: Note  }>) => {
      state = action.payload.note;
    },
    updateActiveNote: (state,  action: PayloadAction<{  note: Partial<Note>  }>) => {
      return { ...state, ...action.payload.note }
    },
    clearActiveNote: () => initialState,
    newActiveNote: () => {
      const date = new Date().valueOf();
      return {  id: 'new', title: '', body: '', lastupdated: date, created: date }
    }
  }
});

export const { getActiveNote, setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;