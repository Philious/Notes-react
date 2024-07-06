
import { AppDispatch, RootState } from "@/redux/store";
import { setDatabase, addNote as _addNote, updateNote as _updateNote, deleteNote as _deleteNote } from "@/redux/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginState } from "./providerHooks";
import { hasFirebase } from "@/utils/sharedUtils";
import { Note } from "@/types/types";
import { getDatabase, onValue, child, push, set, remove, ref as firebaseRef } from "firebase/database";


export const useDatabaseFunctions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useLoginState()
  const database = useSelector((state: RootState) => state.notes);

  if (hasFirebase() && user?.uid || !hasFirebase()) {
    if (hasFirebase()) {
      const uid = user?.uid;
      const fetchAllNotes = () => {
        const db = getDatabase();
        const userDataRef = firebaseRef(db, `users/${uid}`);
        onValue(userDataRef, (snapshot) => {
          const data = snapshot.val().notes as Record<string, Note>;
          dispatch(setDatabase(Object.values(data)))
        });
      }

      const addNote = (note: Note): void => {
        const db = getDatabase();
        const id = push(child(firebaseRef(db), 'note')).key;
        set(firebaseRef(db, `users/${uid}/notes/${id}`), { ...note, id })
          .then(() => console.log('Data saved successfully!'))
          .catch((error) => console.error(error));
      }

      const updateNote = (note: Note) => {
        const db = getDatabase();
        return set(firebaseRef(db, `users/${uid}/notes/${note.id}`), note)
          .then(() => console.log('Data updated successfully!'))
          .catch((error) => console.error(error));
      }

      const deleteNote = (noteId: string) => {
        const db = getDatabase();
        return remove(firebaseRef(db, `users/${uid}/notes/${noteId}`))
          .then(() => console.log('Data removed successfully!'))
          .catch((error) => console.error(error));
      }

      return { fetchAllNotes, addNote, updateNote, deleteNote }
    }

    else {
      const fetchAllNotes = () => {
        const localData = localStorage.getItem('notesTestData');
        const data = (localData ? JSON.parse(localData) : []) as Note[];
        dispatch(setDatabase(Object.values(data)));
      }

      const addNote = (note: Note): void => {
        const id = 'id-' + new Date().valueOf();
        dispatch(_addNote({ ...note, id }));
        localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
      }

      const updateNote = (note: Partial<Note> & { id: string }) => {
        dispatch(_updateNote(note));
        localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
      }

      const deleteNote = (noteId: string) => {
        _deleteNote(noteId);
        localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
      }

      return { fetchAllNotes, addNote, updateNote, deleteNote }
    }
  }
}
