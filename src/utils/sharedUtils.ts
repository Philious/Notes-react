import { PageEnum } from "@/types/enums";
import { NoteProps } from "@/types/types";
import { NavigateFunction } from "react-router-dom";

export const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number): ((...args: T) => void) => {
  let inThrottle: boolean;

  return function (...args: T) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number): ((...args: T) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const dateFormat = (date: string) => new Date(date).toLocaleDateString('sv-se', { year: "2-digit", month: "2-digit", day: "2-digit" });

export const createNode = (nodeType: string, attributes: Record<string, string>) => {
  const elem = document.createElement(nodeType);
  for (const a in attributes) elem.setAttribute(a, attributes[a]);
  return elem;
}

export const uid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const flattenClassName = (a?: string | string[], s?: string) => a ? (Array.isArray(a) ? [...a, s] : [a, s]).join(' ') : s ?? '';

export const newNote = (note?: Partial<NoteProps>): NoteProps => {
  return {
    id: uid(),
    title: '',
    content: '',
    catalog: '',
    tags: [],
    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),
    ...(note ?? {})
  }
}
export const equalNotes = (n1?: NoteProps, n2?: NoteProps) => n1 && n2 && (['title', 'content'] as (keyof NoteProps)[]).filter((k) => n1[k] !== n2[k]).length === 0;

export const intervalHandler = (fn: () => void, time: number) => {
  let interval: ReturnType<typeof setInterval>;

  const start = () => {
    interval = setInterval(fn, time);
  }

  const stop = () => {
    if (interval) clearInterval(interval);
  }

  return { start, stop };
}

export const checkedNavigation = (navigate: NavigateFunction) => (page: PageEnum) => {
  if (location.pathname !== `${import.meta.env.BASE_URL}${page}`) navigate(page);
};

export const toggleObfuscation = (message: string, key: string): string => message.split('').map((char, index) => {
  return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length));
}).join('');
