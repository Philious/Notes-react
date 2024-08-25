import { NoteProps } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotes, addNote, updateNote, deleteNote } from "@/redux/thunks/asyncNoteThunks";
import addCommonCases from "@/redux/commonCase";
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
    setDB: (state, action: PayloadAction<NoteProps[]>) => {
      state.notes = action.payload;
    },
    clearAllNotes: (_state) => initialState,
  },
  extraReducers: (builder) => {
    addCommonCases(builder, fetchNotes, (state, action) => {
      state.notes = action.payload?.sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()) ?? null;
    });
    addCommonCases(builder, addNote, (state, action) => {
      if (state.notes && action.payload) {
        state.notes.push(action.payload);
        state.notes.sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf());
      }
    });
    addCommonCases(builder, updateNote, (state, action) => {
      if (state.notes) {
        const index = state.notes.findIndex(note => note.id === action.meta.arg.id);
        if (index !== -1) {
          const note = state.notes[index];
          state.notes[index] = { ...note, ...action.meta.arg };
          state.notes.sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf());
        }
      }
      return state;
    })
    addCommonCases(builder, deleteNote, (state, action) => {
      if (state.notes) {
        state.notes = state.notes.filter(note => (note.id as string) !== (action.meta.arg as string));
      }
    })
  },
});

export const { clearAllNotes, setDB } = notesSlice.actions;
export type DatabaseActions = typeof notesSlice.actions;
export default notesSlice.reducer;
