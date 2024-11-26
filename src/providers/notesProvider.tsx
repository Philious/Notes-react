import { api } from "@/api/api";
import { useUserState } from "@/hooks/providerHooks";
import { Note, NoteProps } from "@/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


export type UserStateContextType = {
  notes: Note[];
  activeNote: NoteProps | null;
  setActiveNote: React.Dispatch<React.SetStateAction<NoteProps | null>>;
  addNote: (note: NoteProps) => void;
  updateNote: (note: Partial<NoteProps> & { id: string }) => void;
  deleteNote: (id: string) => void 
};

export const NotesContext = createContext<UserStateContextType | null>(null);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setLoading, token } = useUserState();
  const [activeNote, setActiveNote] = useState<NoteProps | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const onNotesUpdate = () => {}
  const addNote = (note: NoteProps) => {
      if (!token) return;
      api.addNote(token, note);
      onNotesUpdate()
  }
  const updateNote = (update: Partial<NoteProps> & {id: string }) => {
    if (!token) return;
    api.updateNote(token, update)
    onNotesUpdate()
  }
  const deleteNote = (id: string) => {
    if (!token) return;
    api.deleteNote(token,id);
    onNotesUpdate()
  } 

  useEffect(() => {
    if (token) {
      api.getAllNotes(token)
        .then((response) => {
          if (response) {
            setNotes(response.data);
          }
        }).catch((err) => console.log(err));
      }
      else {
        setNotes([]);

      }
  }, [token])
  

  return (
    <NotesContext.Provider value={{ notes, activeNote, setActiveNote, addNote, updateNote, deleteNote }}>
      { children }
    </NotesContext.Provider>
  )
}

export const notesProvider = (): UserStateContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useOvelay must be used within a UserStateContext');
  }
  return context;
};