import { NoteProps, ScratchpadProps } from "@/types/types";

const localData = 'notesTestData';
const scratchData = 'scratchData';

export const getNotes = () => {
  const dataString = localStorage.getItem(localData);
  if (dataString) {
    return JSON.parse(dataString) as NoteProps[];
  } else {
    localStorage.setItem(localData, JSON.stringify([]));
    return [] as NoteProps[];
  }
}

export const addNote = (note: NoteProps): void => {
  const database = getNotes();
  const time = new Date().toJSON();
  const id = 'id-' + new Date().valueOf();
  database.push({ ...note, id, createdAt: time, updatedAt: time });

  localStorage.setItem(localData, JSON.stringify([...Object.values(database)]))
}

export const updateNote = (note: Partial<NoteProps> & { id: string }) => {
  const database = getNotes();
  const updatedAt = new Date().toJSON();
  const noteIndex = database.findIndex(n => n.id === note.id);
  database[noteIndex] = { ...database[noteIndex], ...note, updatedAt }

  localStorage.setItem(localData, JSON.stringify([...Object.values(database)]))
}

export const deleteNote = (noteId: string) => {
  const database = getNotes();
  const noteIndex = database.findIndex(n => n.id === noteId);
  database.splice(noteIndex, 1);

  localStorage.setItem(localData, JSON.stringify([...Object.values(database)]))
}

export const getScratchpad = () => {
  const dataString = localStorage.getItem(localData);
  if (dataString) {
    return JSON.parse(scratchData) as ScratchpadProps;
  } else {
    localStorage.setItem(scratchData, JSON.stringify({ content: '', updatedAt: new Date().valueOf() }));
    return { content: '', updatedAt: new Date().valueOf() };
  }
}

export const addScratchpad = () => {
  const updatedAt = new Date().valueOf();
  const scratchpad = { content: '', updatedAt }

  localStorage.setItem(localData, JSON.stringify([...Object.values(scratchpad)]))
}

export const updateScratchpad = (content: string) => {
  const updatedAt = new Date().valueOf();
  const scratchpad = { content, updatedAt }

  localStorage.setItem(localData, JSON.stringify([...Object.values(scratchpad)]))
}