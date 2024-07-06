import { Note } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotesState = Record<string, Note>;

const initialState: NotesState = {};

const notesSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (_state, action: PayloadAction<Note[]>) => {
      return action.payload.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {} as Record<string, Note>);
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state[action.payload.id] = action.payload;
    },
    updateNote: (state, action: PayloadAction<Partial<Note> & { id: string }>) => {
      const prev = state[action.payload.id];
      if (prev) {
        state[action.payload.id] = { ...prev, ...action.payload };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      console.log('remove');
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
