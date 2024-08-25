import { NoteProps } from "@/types/types";
import { newNote } from "@/utils/sharedUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NoteProps = {
  id: '',
  title: '',
  content: '',
  catalog: '',
  tags: [],
  createdAt: '',
  updatedAt: ''
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