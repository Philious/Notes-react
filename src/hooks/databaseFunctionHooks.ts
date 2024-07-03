import { databaseDispatchers } from "@/redux/customDispatchers";
import { DatabaseDispatch, RootState } from "@/redux/store";
import { DatabaseActions } from "@/redux/databaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginState } from "./providerHooks";
import { hasFirebase } from "@/utils/sharedUtils";
import { DatabaseFunctions, DataBaseNotes, Note } from "@/types/types";
import { getDatabase, onValue, child, push, set, remove, ref as firebaseRef } from "firebase/database";


export const useDatabaseFunctions = () => {
  const dispatch = useDispatch<DatabaseDispatch>();
  const { user } = useLoginState()
  const database = useSelector((state: RootState) => state.database.database);
  const databaseFn = databaseDispatchers(dispatch) as DatabaseActions;
  if (hasFirebase() && user?.uid || !hasFirebase()) {
    return databaseFunctions(databaseFn, database, user?.uid);
  }
}

const databaseFunctions = (fn: DatabaseActions, database: DataBaseNotes, uid?: string): DatabaseFunctions => {

  if (uid) {
    const fetchDatabase = () => {
      const db = getDatabase();
      const userDataRef = firebaseRef(db, `users/${uid}`);
      onValue(userDataRef, (snapshot) => {
        const data = snapshot.val().notes as Record<string, Note>;
       fn.fetchDatabase(Object.values(data))
      });
    }

    const addNote = (note: Note): void => {
      const db = getDatabase();
      const id = push(child(firebaseRef(db), 'note')).key;
      set(firebaseRef(db, `users/${uid}/notes/${id}`), {...note, id })
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

    return { fetchDatabase, addNote, updateNote, deleteNote }
  }

  else

  {  
    const fetchDatabase = () => {
      const localData = localStorage.getItem('notesTestData');
      const data = (localData ? JSON.parse(localData) : []) as Note[];
      fn.fetchDatabase(Object.values(data));
    }

    const addNote = (note: Note): void => {
      const id = 'id-' + new Date().valueOf();
      fn.addNote({...note, id});
      localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
    }

    const updateNote = (note: Partial<Note> & { id: string }) => {
      fn.updateNote(note);
      localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
    }

    const deleteNote = (noteId: string) => {
      fn.deleteNote(noteId);
      localStorage.setItem('notesTestData', JSON.stringify([...Object.values(database)]))
    }

    return { fetchDatabase, addNote, updateNote, deleteNote }
  }
}
