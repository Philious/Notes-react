import { NoteProps } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteNote } from "./notesSlice";

type ActiveNoteState = NoteProps

const initialState: ActiveNoteState = {
  id: '',
  title: '',
  content: '',
  catalog: '',
  tags: [],
  updatedAt: 0,
  createdAt: 0
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
      return ({
        id: 'new',
        title: '',
        content: '',
        catalog: '',
        tags: [],
        ...(action?.payload ?? {}), updatedAt: date, createdAt: date
      })
    }
  }
});

export const { setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;