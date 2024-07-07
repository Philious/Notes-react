import activeNoteSlice from '@/redux/activeNoteSlice'
import notesSlice from '@/redux/notesSlice'
import { scratch } from '@/types/enums'
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
  (notes) => Object.values(notes).filter(n => n.id !== scratch).sort((a, b) => b.lastupdated - a.lastupdated)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;