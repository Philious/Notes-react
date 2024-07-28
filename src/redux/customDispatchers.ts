import { AppDispatch, RootState } from "@/redux/store";
import { NoteProps } from "@/types/types";
import { setActiveNote as _setActiveNote, updateActiveNote as _updateActiveNote, clearActiveNote as _clearActiveNote, newActiveNote as _newActiveNote } from "@/redux/activeNoteSlice";
import { addNote as _addNote, updateNote as _updateNote, deleteNote as _deleteNote, clearAllNotes as _clearAllNotes, setDatabase as _setDatabase, setDatabase } from '@/redux/notesSlice';
import { useSelector } from "react-redux";

export type NoteDispatchers = {
  fetchAllNotes: () => void;
  clearAllNotes: () => void;
  addNote: (note: NoteProps, fixedID?: string) => void;
  updateNote: (note: Partial<NoteProps> & { id: string }) => void;
  deleteNote: (noteId: string) => void;
}

export const activeNoteDispatchers = (dispatch: AppDispatch) => ({
  setActiveNote: (note: NoteProps) => dispatch(_setActiveNote(note)),
  updateActiveNote: (note: Partial<NoteProps>) => dispatch(_updateActiveNote(note)),
  clearActiveNote: () => dispatch(_clearActiveNote()),
  newActiveNote: (note?: Partial<NoteProps>) => dispatch(_newActiveNote(note)),
});

export const useDatabaseFunctions = (dispatch: AppDispatch): NoteDispatchers => {
  const database = useSelector((state: RootState) => state.notes);

  const fetchAllNotes = () => {
    const localData = localStorage.getItem('notesTestData');
    const data = (localData ? JSON.parse(localData) : []) as NoteProps[];
    dispatch(setDatabase(Object.values(data)));
  }

  const addNote = (note: NoteProps, fixedID?: string): void => {
    const id = fixedID ?? 'id-' + new Date().valueOf();
    const newNote = { ...note, id };
    dispatch(_addNote(newNote));
    localStorage.setItem('notesTestData', JSON.stringify([...Object.values({ ...database, [id]: newNote })]))
  }

  const updateNote = (note: Partial<NoteProps> & { id: string }) => {
    dispatch(_updateNote(note));
    const prev = database[note.id];
    const update = { ...database, [note.id]: { ...prev, ...note } };
    localStorage.setItem('notesTestData', JSON.stringify([...Object.values(update)]))
  }

  const deleteNote = (noteId: string) => {
    dispatch(_deleteNote(noteId));
    const prev = { ...database };
    delete prev[noteId];
    localStorage.setItem('notesTestData', JSON.stringify([...Object.values(prev)]))
  }

  const clearAllNotes = () => {
    localStorage.removeItem('notesTestData');
  }

  return { fetchAllNotes, clearAllNotes, addNote, updateNote, deleteNote }
}


