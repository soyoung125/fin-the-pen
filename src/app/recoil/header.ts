/**
 * header의 상태를 결정한다.
 */
import {atom, selector} from "recoil";

export const HEADER_MODE = {
  analysis: 'analysis',
  home: 'home',
  settings: 'settings',
} as const;

export type HeaderModeType = typeof HEADER_MODE[keyof typeof HEADER_MODE];

export const headerOpenState = atom<boolean>({
  key: "headerOpenState",
  default: true
});

export const headerModeState = atom<HeaderModeType>({
  key: "headerModeState",
  default: HEADER_MODE.home
});

export const headerRepository = selector({
  key: "headerRepository",
  get: ({getCallback}) => {
    const openHeader = getCallback(({set}) => (mode: HeaderModeType | undefined) => {
      if (mode !== undefined) {
        set(headerModeState, mode);
      }
      set(headerOpenState, true);
    });

    const closeHeader = getCallback(({set}) => () => {
      set(headerOpenState, false);
    });

    return {
      openHeader,
      closeHeader
    }
  }
})