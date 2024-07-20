import { NoteProps } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveNoteState = NoteProps

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
    setActiveNote: (_state, action: PayloadAction<NoteProps>) => {
      return action.payload;
    },
    updateActiveNote: (state, action: PayloadAction<Partial<NoteProps>>) => {
      return { ...state, ...action.payload }
    },
    clearActiveNote: () => initialState,
    newActiveNote: (_state, action: PayloadAction<Partial<NoteProps> | undefined>) => {
      const date = new Date().valueOf();
      return ({ id: 'new', title: '', body: '', ...(action?.payload ?? {}), lastupdated: date, created: date })
    }
  }
});

export const { setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;