import { DatabaseDispatch } from "@/redux/store";
import { Note } from "@/types/types";
import { setActiveNote as _setActiveNote, updateActiveNote as _updateActiveNote, clearActiveNote as _clearActiveNote, newActiveNote as _newActiveNote } from "@/redux/activeNoteSlice";
import { addNote as _addNote, updateNote as _updateNote, deleteNote as _deleteNote, clearDatabase as _clearDatabase, fetchDatabase as _fetchDatabase } from '@/redux/databaseSlice';

export const activeNoteDispatchers = (dispatch: DatabaseDispatch) => ({
  setActiveNote: (note: Note) => dispatch(_setActiveNote({ note })),
  updateActiveNote: (note: Partial<Note>) => dispatch(_updateActiveNote(note)),
  clearActiveNote: () => dispatch(_clearActiveNote()),
  newActiveNote: () => dispatch(_newActiveNote()),
});

export const databaseDispatchers = (dispatch: DatabaseDispatch) => ({
  addNote: (note: Note) => dispatch(_addNote(note)),
  updateNote: (note: Note) => dispatch(_updateNote(note)),
  deleteNote: (noteId: string) => dispatch(_deleteNote(noteId)),
  clearDatabase: () => dispatch(_clearDatabase()),
  fetchDatabase: (notes: Note[]) => dispatch(_fetchDatabase(notes))
});
