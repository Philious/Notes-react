import { noteActions } from "@/services/dotNetService";
import { useUserState } from "./providerHooks";
import { PageEnum } from "@/types/enums";


export const useNotes = () => {
  const noteById = () => { };
  const addNote = () => { };
  const updateNote = () => { };
  const deleteNote = (noteId: string) => {
    noteActions.delete(noteId)
  };

  return { noteById, addNote, updateNote, deleteNote }
}