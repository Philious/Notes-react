import { NoteProps } from "@/types/types";
import { newNote } from "@/utils/sharedUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      return newNote(action.payload);
    }
  }
});

export const { setActiveNote, updateActiveNote, clearActiveNote, newActiveNote } = activeNoteSlice.actions;
export default activeNoteSlice.reducer;