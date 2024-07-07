import { ContextMenuItemType, Dialog } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export type OverlayContextType = {
  contextMenu?: ContextMenuItemType[];
  setContextMenu: (update?: ContextMenuItemType[]) => void;
  dialog?: Dialog;
  setDialog: (update?: Dialog) => void;
}

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuItemType[]>();
  const [dialog, setDialog] = useState<Dialog>();
  
  return (
    <>
    <OverlayContext.Provider value={{
      contextMenu,
      setContextMenu,
      dialog,
      setDialog,
    }}>
      {children}
    </OverlayContext.Provider>
    </>
  );
};