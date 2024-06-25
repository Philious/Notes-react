import { Dialog, DialogAction, DialogContextType } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<Dialog>({
    title: '',
    content: '',
    actions: [],
  });

  const openDialog = (title: string, content: string, actions: DialogAction[]) => {
    setDialog({ title, content, actions });
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialog({ title: '', content: '', actions: [] });
  };

  return (
    <>
    <DialogContext.Provider value={{ openDialog, closeDialog, dialog, isOpen }}>
      {children}
    </DialogContext.Provider>
    </>
  );
};
