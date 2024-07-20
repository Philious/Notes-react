import { AppDispatch, RootState } from "@/redux/store";
import { NoteProps } from "@/types/types";
import { setActiveNote as _setActiveNote, updateActiveNote as _updateActiveNote, clearActiveNote as _clearActiveNote, newActiveNote as _newActiveNote } from "@/redux/activeNoteSlice";
import { addNote as _addNote, updateNote as _updateNote, deleteNote as _deleteNote, clearAllNotes as _clearAllNotes, setDatabase as _setDatabase, setDatabase } from '@/redux/notesSlice';
import { useLoginState } from "@/hooks/providerHooks";
import { hasFirebase } from "@/utils/sharedUtils";
import { getDatabase, onValue, push, child, set, remove, ref } from "firebase/database";
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
  const { user } = useLoginState()
  const database = useSelector((state: RootState) => state.notes);

  if (hasFirebase() && user?.uid) {
    const uid = user?.uid;
    const fetchAllNotes = () => {
      const db = getDatabase();
      const userDataRef = ref(db, `users/${uid}`);
      onValue(userDataRef, (snapshot) => {
        const data = snapshot.val().notes as Record<string, NoteProps>;
        dispatch(_setDatabase(Object.values(data)))
      });
    }

    const addNote = (note: NoteProps, fixedID?: string): void => {
      const db = getDatabase();
      const id = fixedID ?? push(child(ref(db), 'note')).key;
      set(ref(db, `users/${uid}/notes/${id}`), { ...note, id })
        .then(() => console.log('Data saved successfully!'))
        .catch((error) => console.error(error));
    }

    const updateNote = (note: Partial<NoteProps> & { id: string }) => {
      const db = getDatabase();
      return set(ref(db, `users/${uid}/notes/${note.id}`), note)
        .then(() => console.log('Data updated successfully!'))
        .catch((error) => console.error(error));
    }

    const deleteNote = (noteId: string) => {
      const db = getDatabase();
      return remove(ref(db, `users/${uid}/notes/${noteId}`))
        .then(() => console.log('Data removed successfully!'))
        .catch((error) => console.error(error));
    }

    return { fetchAllNotes, clearAllNotes: _clearAllNotes, addNote, updateNote, deleteNote }
  } else {
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
}

