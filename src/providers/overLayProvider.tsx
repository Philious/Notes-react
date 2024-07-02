import { ContextMenuItem, Dialog, Note } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export type OverlayContextType = {
  contextMenu?: ContextMenuItem[];
  setContextMenu: (update?: ContextMenuItem[]) => void;
  dialog?: Dialog;
  setDialog: (update?: Dialog) => void;
  activeNote?: Note;
  setActiveNote: (update?: Note) => void
  updateActiveNote: (update: Partial<Note>) => void
  clearActiveNote: () => void;
  newActiveNote: () => void;
}

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuItem[]>();
  const [dialog, setDialog] = useState<Dialog>();
  const [activeNote, setActiveNote] = useState<Note>();

  const updateActiveNote = (update: Partial<Note>) => ({ ...activeNote, ...update });
  const clearActiveNote = () => setActiveNote(undefined);
  const newActiveNote = () => {
    const date = new Date().valueOf();
    setActiveNote({  id: 'new', title: '', body: '', lastupdated: date, created: date })
  }
  return (
    <>
    <OverlayContext.Provider value={{
      contextMenu,
      setContextMenu,
      dialog,
      setDialog,
      activeNote,
      setActiveNote,
      updateActiveNote,
      clearActiveNote,
      newActiveNote
    }}>
      {children}
    </OverlayContext.Provider>
    </>
  );
};