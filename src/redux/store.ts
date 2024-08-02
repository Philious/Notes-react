import activeNoteReducers from '@/redux/activeNoteSlice';
import scratchPadReducers from '@/redux/scratchPadSlice';
import notesReducers from '@/redux/notesSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    activeNote: activeNoteReducers,
    scratchPad: scratchPadReducers,
    notes: notesReducers,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;