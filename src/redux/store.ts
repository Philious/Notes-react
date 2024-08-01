import activeNoteSlice from '@/redux/activeNoteSlice'
import notesSlice from '@/redux/notesSlice'
import { scratch } from '@/types/enums'
import { NoteProps } from '@/types/types'
import { configureStore, createSelector } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    activeNote: activeNoteSlice,
    notes: notesSlice,
  },
})

const notes = (state: RootState) => state.notes
export const getSortedNotes = createSelector(
  [notes],
  (notes) => Object.values(notes).filter(n => n.id !== scratch).sort((a, b) => b.updatedAt - a.updatedAt)
);
export const getScratchNote = createSelector(
  [notes],
  (notes): NoteProps => {
    return Object.values(notes).find(n => n.id === scratch) ?? {
      id: scratch, content: '',
      title: 'Scratch note',
      updatedAt: 0,
      createdAt: 0
    }
  }
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;