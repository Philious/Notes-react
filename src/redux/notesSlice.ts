import { NoteProps } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotesState = Record<string, NoteProps>;

const initialState: NotesState = {};

const notesSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (_state, action: PayloadAction<NoteProps[]>) => {
      return action.payload.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {} as Record<string, NoteProps>);
    },
    addNote: (state, action: PayloadAction<NoteProps>) => {
      state[action.payload.id] = action.payload;
    },
    updateNote: (state, action: PayloadAction<Partial<NoteProps> & { id: string }>) => {
      const prev = state[action.payload.id];
      if (prev) {
        state[action.payload.id] = { ...prev, ...action.payload };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const prev = { ...state };
      delete prev[action.payload];

      return prev;
    },
    clearAllNotes: () => {
      return ({});
    }
  }
});

export const { setDatabase, addNote, updateNote, deleteNote, clearAllNotes } = notesSlice.actions;
export type DatabaseActions = typeof notesSlice.actions;
export default notesSlice.reducer;
