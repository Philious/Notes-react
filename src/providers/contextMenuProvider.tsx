import { ContextMenuContextType, ContextMenuItem } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export const CMContext = createContext<ContextMenuContextType | undefined>(undefined);

export const ContextMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuItem[]>([]);

  const openContextMenu = (_contextMenu: ContextMenuItem[]) => {
    setContextMenu(_contextMenu);
  }

  const closeMenu = () => setContextMenu([])

  return (
    <>
    <CMContext.Provider value={{ contextMenu, openContextMenu, closeMenu }}>
      {children}
    </CMContext.Provider>
    </>
  );
};
