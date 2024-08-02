import { NoteProps } from "@/types/types";
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

export const dateFormat = (date: number) => new Date(date).toLocaleDateString('sv-se', { year: "2-digit", month: "2-digit", day: "2-digit" });

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
  const date = new Date().valueOf();
  return {
    id: uid(),
    title: '',
    content: '',
    catalog: '',
    tags: [],
    createdAt: date,
    updatedAt: date,
    ...(note ?? {})
  }
}
export const equalNotes = (n1?: NoteProps, n2?: NoteProps) => n1 && n2 && (Object.keys(n1) as (keyof NoteProps)[]).filter((k) => n1[k] !== n2[k]).length === 0;

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
