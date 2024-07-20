import { ContextMenuItemProps, DialogProps } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export type OverlayContextType = {
  contextMenu?: ContextMenuItemProps[];
  setContextMenu: (update?: ContextMenuItemProps[]) => void;
  dialog?: DialogProps;
  setDialog: (update?: DialogProps) => void;
  setLetterSize: () => void
}

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuItemProps[]>();
  const [dialog, setDialog] = useState<DialogProps>();
  
  const setLetterSize = () => {
    setContextMenu([
      { label: 'Larger', action: () => document.body.parentElement?.setAttribute('style', 'font-size: larger') },
      { label: 'Large', action: () => document.body.parentElement?.setAttribute('style', 'font-size: large') },
      { label: 'Medium',  action: () => document.body.parentElement?.setAttribute('style', 'font-size: medium') },
      { label: 'Small', action: () => document.body.parentElement?.setAttribute('style', 'font-size: small') },
    ]);
  }

  return (
    <>
    <OverlayContext.Provider value={{
      contextMenu,
      setContextMenu,
      dialog,
      setDialog,
      setLetterSize
    }}>
      {children}
    </OverlayContext.Provider>
    </>
  );
};