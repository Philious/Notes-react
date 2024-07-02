import { User } from "firebase/auth";
import { Icon, ButtonType } from "./enums";

export interface UserData {
  username: string;
  token: string;
}

export type Note = {
  id: string;
  title: string;
  body: string;
  lastupdated: number;
  created: number;
}

export type MenuOption = {
  label: string,
  action: () => void
}

export type ContextMenuItem = {
  label: string,
  icon?: Icon;
  keepOpen?: boolean;
  action: () => void
}

export type DataBaseNotes = Record<string, Note>

export type CustomComponent<T> = { Component: React.FC } & Record<string, T>;

export type Tab = {
  id: string;
  label: string;
  icon: string;
  action: () => void
}

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
  type: ButtonType;
  icon: Icon;
  action: () => void;
}

export type State = {
  loading: boolean,
  errorMessage: string | undefined,
}

export type ContextMenuContextType = {
  contextMenu: ContextMenuItem[]
  openContextMenu: (contextMenu: ContextMenuItem[]) => void;
  closeMenu: () => void;
}

export type DialogContextType = {
  openDialog: (title: string, content: string, actions: DialogAction[]) => void;
  closeDialog: () => void;
  dialog: Dialog;
  isOpen: boolean;
};

export type DataBaseContextType = {
  database: DataBaseNotes;
  user: User | null;
  activeNote: Note | undefined;
  token: string | undefined;
  loading: boolean;
  dataBaseCalls: DatabaseFunctions | undefined;
  loginWithGoogle: () => void;
  logout: () => void;
  getActiveNote: () => Note | undefined;
  setActiveNote: (note: Note) => void;
  clearActiveNote: () => void;
  newActiveNote: () => void;
  updateActiveNote: (note: Note) => void;
}

export type ActiveNoteFunctions = {
  getActiveNote: () => Note | undefined;
  setActiveNote: (note: Note) => void;
  updateActiveNote: (note: Partial<Note>) => void;
  clearActiveNote: () => void;
  newActiveNote: (note?: Partial<Note>) => void;
}

export type DatabaseFunctions = {
  fetchDatabase: () => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
}

export type LoginStateFunctions = {
  redirectSignIn: () => void;
  passwordSignIn: (name: string, password: string) => void;
  logout: () => void;
  forgotPassword: () => void;
  newUser: () => void;
}