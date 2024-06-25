import { DataBaseNotes, Note } from "@/types/types";
import { child, get, getDatabase, onValue, push, ref, remove, set } from "firebase/database";

export const FirebaseCalls = (uid: string, setDatabase: React.Dispatch<React.SetStateAction<DataBaseNotes>>) => {
  const getAllNotes = () => {
    const db = getDatabase();
    const userDataRef = ref(db, `users/${uid}`);
    onValue(userDataRef, (snapshot) => {

      const data = snapshot.val().notes as Record<string, Note>;
      const tmpdataBase = new Map();
      for (const key in data) tmpdataBase.set(data[key].id, data[key]);
      setDatabase(tmpdataBase);
    });
  }

  const getNote = (noteId: string) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}${noteId}`)).then((snapshot) => snapshot.exists() ? snapshot.val() : false)
    .then(() => console.log('Data gotten successfully!'))
    .catch((error) => console.error(error));
  }

  const setNote = (note: Note): void => {
    const db = getDatabase();
    const id = push(child(ref(db), 'note')).key;
    set(ref(db, `users/${uid}/notes/${id}`), {...note, id })
    .then(() => console.log('Data saved successfully!'))
    .catch((error) => console.error(error));
  }

  const updateNote = (note: Note) => {
    const db = getDatabase();
    console.log(note);
    return set(ref(db, `users/${uid}/notes/${note.id}`), note)
    .then(() => console.log('Data updated successfully!'))
    .catch((error) => console.error(error));
  }

  const removeNote = (noteId: string) => {
    const db = getDatabase();
    return remove(ref(db, `users/${uid}/notes/${noteId}`))
    .then(() => console.log('Data removed successfully!'))
    .catch((error) => console.error(error));
  }

  return { getAllNotes, getNote, setNote, updateNote, removeNote }
}

export const testCalls = (setDatabase: React.Dispatch<React.SetStateAction<DataBaseNotes>>) => {

  const addOrUpdateEntry = (key: string, value: Note) => {
    setDatabase(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  };

  const removeEntry = (key: string) => {
    setDatabase(prevMap => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  const getAllNotes = () => {
    const localData = localStorage.getItem('notesTestData');
    const data = (localData ? JSON.parse(localData) : []) as Note[];
    const tmpdataBase = new Map();
    for (const key in data) tmpdataBase.set(data[key].id, data[key]);
    setDatabase(tmpdataBase);
  }

  const setNote = (note: Note): void => {
    console.log('set note: ', note);
    const id = 'id-' + new Date().valueOf();
    addOrUpdateEntry(id, { ...note, id: id });
  }

  const updateNote = (note: Note) => {
    console.log('set note: ', note);
    addOrUpdateEntry(note.id, note);
  }

  const removeNote = (noteId: string) => {
    removeEntry(noteId);
  }

  return { getAllNotes, setNote, updateNote, removeNote }
}
