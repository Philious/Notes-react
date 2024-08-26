import { Auth, GoogleAuthProvider, User } from "firebase/auth";
import { IconEnum, ButtonEnum } from "./enums";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  catalog: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ScratchpadProps = {
  content: string;
  updatedAt: string;
}

export type ContextMenuItemProps = {
  label: string,
  icon?: IconEnum;
  keepOpen?: boolean;
  action: () => void
}

export type UserProps = {
  id: string,
  username: string,
  email: string,
  createdAt: string,
}

export type DataBaseNotes = Record<string, NoteProps>

export type ToastOptions = {
  duration?: number;
  transitionDuration?: number;
  align?: 'left' | 'center' | 'right';
}

export type DialogActionProps = {
  name: string;
  action: () => void;
  closeOnAction?: boolean;
}

export type DialogProps = {
  title: string,
  content: string,
  actions: DialogActionProps[]
}

export type IconButtonProps = {
  type: ButtonEnum;
  icon: IconEnum;
  action: () => void;
}

export type NoteAPI = {
  fetchAll: (user: User) => Promise<NoteProps[]>;
  add: (note: NoteProps) => Promise<NoteProps | null>;
  update: (note: NoteProps & { id: string; }) => Promise<NoteProps | null>;
  remove: (id: string) => Promise<string | null>;
}

export type ScratchpadAPI = {
  fetch: () => Promise<ScratchpadProps | null>;
  update: (content: string) => Promise<ScratchpadProps | null>;
}

export type LoginData = { email: string, password: string }

export type OldNoteType = {
  body: string;
  created: number;
  id: string;
  lastupdated: number;
  title: string;
}

export type ErrorReturn = { errorCode: string, errorMessage: string }

export type UserResponse = {
  errorCode?: undefined;
  id: string;
  username: string | null;
  email: string | null;
  createdAt: string;
}

export type UserAPI = {
  register: (email: string, password: string) => Promise<UserResponse | ErrorReturn>;
  login: (email: string, password: string) => Promise<UserResponse | ErrorReturn>;
  popupLogin: (auth: Auth, provider: GoogleAuthProvider) => Promise<UserResponse | ErrorReturn>
  logout: () => void;
}
