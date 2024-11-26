import ContextMenu from "@/components/ContextMenu";
import Dialog from "@/components/Dialog";
import NoteView from "@/components/Note";
import { useMountingDelays, MountState } from "@/hooks/componentUnmountDelay";
import { ContextMenuItemProps, DialogContextProps } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

export type ToggleOverlay<T> = {
  open: (props: T) => void;
  close: () => void;
}

export type OverlayContextType = {
  contextMenu: ToggleOverlay<ContextMenuItemProps[]>;
  dialog: ToggleOverlay<DialogContextProps>;
  setLetterSize: () => void
}

export const OverlayContext = createContext<OverlayContextType | null>(null);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextMenuProps, setContextMenuProps] = useState<ContextMenuItemProps[] | null>(null);
  const [dialogContextProps, setDialogContextProps] = useState<DialogContextProps | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [noteViewVisible, oteViewVisible] = useState(false);
  const contextMenuMountingState = useMountingDelays(!!contextMenuVisible, 250, 250);
  const dialogMountingState = useMountingDelays(!!dialogVisible, 250, 250);
  const noteViewMountingState = useMountingDelays(!!noteViewVisible, 250, 500);

  const contextMenu = {
    open: (props: ContextMenuItemProps[]) => {
      setContextMenuProps(props);
      setContextMenuVisible(true);
      return contextMenuVisible;
    },
    close: () => {
      setContextMenuVisible(false);
    }
  }

  const dialog = {
    open: (props: DialogContextProps) => {},
    close: () => {}
  }

  const noteView = {
    open: (props: DialogContextProps) => {},
    close: () => {}
  }

  const setLetterSize = () => contextMenu.open([
    { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
    { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
    { label: 'Medium',  action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
    { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') },
  ]);

  return (
    <>
    <OverlayContext.Provider value={{
      contextMenu,
      dialog,
      setLetterSize
    }}>
      {children}
      <NoteView {...{mountState: noteViewMountingState, contextMenu, dialog, close: noteView.close, setLetterSize }} />
      <Dialog {...{ mountState: dialogMountingState, dialogContextProps, close: dialog.close }}/>
      <ContextMenu {...{ mountState: contextMenuMountingState, contextMenuItems: contextMenuProps, close: contextMenu.close}}/>
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