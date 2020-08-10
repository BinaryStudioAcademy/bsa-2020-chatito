// Usage: create ref on your input with useRef, pass key code as string

import React, { useEffect } from 'react';

export const useKey = (key: string, callback: () => void, ref: React.RefObject<HTMLElement>) => {
  const match = (event: KeyboardEvent) => key.toLowerCase() === event.key.toLowerCase();

  const onUp = (event: KeyboardEvent) => {
    console.log(event.key);

    if (match(event)) {
      callback();
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      const current = ref.current;

      current.addEventListener('keyup', onUp, true);

      return () => {
        current.removeEventListener('keyup', onUp);
      };
    }
    return undefined;
  }, [key, ref]);

  return key;
};
