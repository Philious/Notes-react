import { Note } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DatabaseState = {
  database: Record<string, Note>;
}

const initialState: DatabaseState = {
  database: {}
};

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    fetchDatabase: (state, action: PayloadAction<Note[]>) => {
      state.database = action.payload.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {} as Record<string, Note>);
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.database[action.payload.id] = action.payload;
    },
    updateNote: (state, action: PayloadAction<Partial<Note> & { id: string }>) => {
      const prev = state.database[action.payload.id];
      if (prev) {
        state.database[action.payload.id] = { ...prev, ...action.payload };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      delete state.database[action.payload];
    },
    clearDatabase: (state) => {
      state.database = {};
    }
  }
});

export const { fetchDatabase, addNote, updateNote, deleteNote, clearDatabase } = databaseSlice.actions;
export type DatabaseActions = typeof databaseSlice.actions;
export default databaseSlice.reducer;
