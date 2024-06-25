import { CMContext } from "@/providers/contextMenuProvider";
import { FireBaseContext } from "@/providers/firebasProvider";
import { DialogContext } from "@/services/dialogService";
import { ContextMenuContextType, DataBaseContextType, DialogContextType } from "@/types/types";
import { useContext } from "react";

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const useContextMenu = (): ContextMenuContextType => {
  const context = useContext(CMContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

export const useDatabase = (): DataBaseContextType => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};