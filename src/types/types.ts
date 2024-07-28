import { IconEnum, ButtonEnum } from "./enums";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  catalog: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
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