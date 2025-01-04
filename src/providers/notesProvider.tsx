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

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useUserState();
  const [activeNote, setActiveNote] = useState<NoteProps | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = async (note: NoteProps) => {
      if (!token) return;
      const response = await api.addNote(token, note);
      setNotes(lokalNotes => response.body ?? lokalNotes);
  }
  
  const updateNote = (update: Partial<NoteProps> & {id: string }) => {
    if (!token) return;
    api.updateNote(token, update)
    setNotes(lokalNotes => lokalNotes.map(n => n.id === update.id ? {...n, ...update} : n));
  }

  const deleteNote = (id: string) => {
    if (!token) return;
    api.deleteNote(token, id);
    setNotes(lokalNotes => lokalNotes.filter(n => n.id !== id))
  } 

  useEffect(() => {
    if (token) {
      api.getAllNotes(token)
        .then((response) => {
          if (response.body) {
            setNotes(response.body);
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