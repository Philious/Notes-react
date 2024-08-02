import { NoteProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes, addNote, updateNote, deleteNote } from "@/redux/asyncNoteThunks";
import addCommonCases from "./utils";
import { NetworkStatus } from "@/types/enums";

type NotesState = {
  notes: NoteProps[] | null;
  status: NetworkStatus;
  error: string | null;
}

const initialState: NotesState = {
  notes: null,
  status: NetworkStatus.IDLE,
  error: null,
};

const notesSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    clearAllNotes: (_state) => initialState,
  },
  extraReducers: (builder) => {
    addCommonCases(builder, fetchNotes, (state, action) => {
      state.notes = action.payload?.sort((a, b) => b.updatedAt - a.updatedAt) ?? null;
    });
    addCommonCases(builder, addNote, (state, action) => {
      if (state.notes) {
        state.notes.push(action.payload);
        state.notes.sort((a, b) => b.updatedAt - a.updatedAt);
      }
    });
    addCommonCases(builder, updateNote, (state, action) => {
      if (state.notes) {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
          state.notes.sort((a, b) => b.updatedAt - a.updatedAt);
        }
      }
    })
    addCommonCases(builder, deleteNote, (state, action) => {
      if (state.notes) {
        state.notes = state.notes.filter(note => (note.id as string) !== (action.meta.arg as string));
      }
    })
  },
});

export const { clearAllNotes } = notesSlice.actions;
export type DatabaseActions = typeof notesSlice.actions;
export default notesSlice.reducer;
