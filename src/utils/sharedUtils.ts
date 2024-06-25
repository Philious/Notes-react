export const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number): ((...args: T) => void) => {
  let inThrottle: boolean;

  return function(...args: T) {
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

  return function(...args: T) {
      if (timer !== null) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          func(...args);
      }, delay);
  };
}

export const dateFormat = (date: number) => new Date(date).toLocaleDateString('sv-se', { year:"2-digit", month: "2-digit", day:"2-digit"});

export const createNode = (nodeType: string, attributes: Record<string, string>) => {
    const elem = document.createElement(nodeType);
    for (const a in attributes) elem.setAttribute(a, attributes[a]);
    return elem;
}

export const uid = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
