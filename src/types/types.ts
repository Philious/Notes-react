import { IconEnum, ButtonEnum } from "./enums";

export type NoteProps = {
  id?: string;
  title: string,
  content: string,
  catalog: string,
  tags: string[]
}

export interface NoteResponse {
  id: string;
  title: string;
  content: string;
  catalog: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type ScratchResponse = {
  content: string;
  updatedAt: number;
}

export type ScratchProps = {
  content: string;
}

export type ContextMenuItemProps = {
  label: string,
  icon?: IconEnum;
  keepOpen?: boolean;
  action: () => void
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