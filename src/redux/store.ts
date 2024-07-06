import activeNoteSlice from '@/redux/activeNoteSlice'
import notesSlice from '@/redux/notesSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    activeNote: activeNoteSlice,
    notes: notesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;