import { IconEnum, ButtonEnum } from "./enums";

export type Note = {
  id: string;
  title: string;
  body: string;
  lastupdated: number;
  created: number;
}

export type ContextMenuItemType = {
  label: string,
  icon?: IconEnum;
  keepOpen?: boolean;
  action: () => void
}

export type DataBaseNotes = Record<string, Note>

export type ToastOptions = {
  duration?: number;
  transitionDuration?: number;
  align?: 'left' | 'center' | 'right';
}

export type DialogAction = {
  name: string;
  action: () => void;
  closeOnAction?: boolean;
}

export type Dialog = {
  title: string,
  content: string,
  actions: DialogAction[]
}

export type IconButtonType = {
  type: ButtonEnum;
  icon: IconEnum;
  action: () => void;
}

export type DialogContextType = {
  openDialog: (title: string, content: string, actions: DialogAction[]) => void;
  closeDialog: () => void;
  dialog: Dialog;
  isOpen: boolean;
};

export type ActiveNoteFunctions = {
  getActiveNote: () => Note | undefined;
  setActiveNote: (note: Note) => void;
  updateActiveNote: (note: Partial<Note>) => void;
  clearActiveNote: () => void;
  newActiveNote: (note?: Partial<Note>) => void;
}

export type LoginStateFunctions = {
  redirectSignIn: () => void;
  passwordSignIn: (name: string, password: string) => void;
  logout: () => void;
  forgotPassword: () => void;
  newUser: () => void;
}