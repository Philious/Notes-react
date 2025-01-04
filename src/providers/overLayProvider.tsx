import ContextMenu from "@/components/ContextMenu";
import Dialog from "@/components/Dialog";
import NoteView from "@/components/Note";
import { useNotes } from "@/hooks/providerHooks";
import { ContextMenuItemProps, DialogContextProps, NoteProps } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

export type ToggleOverlay<T> = {
  open: (props: T) => void;
  close: () => void;
}

export type OverlayContextType = {
  setContextMenu: ToggleOverlay<ContextMenuItemProps[]>;
  setDialog: ToggleOverlay<DialogContextProps>;
  setNoteView: ToggleOverlay<NoteProps>
  setLetterSize: () => void
}

export const OverlayContext = createContext<OverlayContextType | null>(null);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const { setActiveNote, activeNote } = useNotes();
  const [contextMenuProps, setContextMenuProps] = useState<ContextMenuItemProps[] | null>(null);
  const [dialogContextProps, setDialogContextProps] = useState<DialogContextProps | null>(null);

  const [noteViewVisible, setNoteViewVisible] = useState(false);

  const setContextMenu = {
    open: (props: ContextMenuItemProps[]) => {
      setContextMenuProps(props);
    },
    close: () => {
      setContextMenuProps(null);
    }
  }

  const setDialog = {
    open: (props: DialogContextProps) => {
      setDialogContextProps(props);
    },
    close: () => {
      setDialogContextProps(null);
    }
  }

  const setNoteView = {
    open: (props: NoteProps) => {
      console.log('open notge view');
      setActiveNote(props);
      setTimeout(() => setNoteViewVisible(true));
    },
    close: () => {
      setNoteViewVisible(false);
      setTimeout(() => setActiveNote(null), 500)
    }
  }

  const setLetterSize = () => setContextMenu.open([
    { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
    { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
    { label: 'Medium',  action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
    { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') },
  ]);

  return (
    <>
    <OverlayContext.Provider value={{
      setContextMenu,
      setDialog,
      setNoteView,
      setLetterSize
    }}>
      {children}
      { activeNote && <NoteView {...{setContextMenu, show: noteViewVisible, setDialog, close: setNoteView.close, setLetterSize}} /> }
      <Dialog {...{dialogContextProps: dialogContextProps,  close: setDialog.close}} />
      <ContextMenu {...{contextMenuItems: contextMenuProps, close: setContextMenu.close}} />
    </OverlayContext.Provider>
    </>
  );
};

export const overlayProvider = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOvelay must be used within a OverlayProvider');
  }
  return context;
};