import React, { useEffect } from 'react';
import { IBindingAction } from '../models/callback/IBindingActions';
import { areEqualStrings } from '../helpers/globalHelpers';

interface IParams {
  key: string;
  ref: React.RefObject<HTMLElement>;
  callback: IBindingAction;
}

// Usage: create ref on your input with useRef, pass key as string
export const useKey = ({ key, callback, ref }: IParams) => {
  const onUp = (event: KeyboardEvent) => {
    if (areEqualStrings(key, event.key)) {
      callback();
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      const { current } = ref;

      current.addEventListener('keyup', onUp, true);

      return () => {
        current.removeEventListener('keyup', onUp, true);
      };
    }
    return undefined;
  }, [key, ref, callback]);
};
