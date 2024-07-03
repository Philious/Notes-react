import activeNoteSlice from '@/redux/activeNoteSlice'
import databaseSlice from '@/redux/databaseSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    activeNote: activeNoteSlice,
    database: databaseSlice,
  },
})

// Infer the `RootState` and `DatabaseDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type DatabaseDispatch = typeof store.dispatch
export default store;