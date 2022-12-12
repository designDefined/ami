import create from "zustand";
import { ISelectableType } from "../types/old/interaction";
import { IPage } from "../types/page";
import { IAtom } from "../types/atom";

type ICursorStatus = "wait" | "drag";

interface ICursorStore {
  status: ICursorStatus;
  current: ISelectableType;
  interactionKey: string[];
  x: number;
  y: number;
  xDiff: number;
  yDiff: number;
  updateCursor: (x: number, y: number) => void;
  startDragPage: (
    data: IPage,
    initial: { initX: number; initY: number },
    diff: { diffX: number; diffY: number },
    interactionKey?: string[],
  ) => void;
  startDragAtom: (
    data: IAtom,
    initial: { initX: number; initY: number },
    diff: { diffX: number; diffY: number },
    interactionKey?: string[],
  ) => void;
  releaseDrag: () => void;
}

export const useCursor = create<ICursorStore>()((set) => ({
  status: "wait",
  current: { type: "none", data: null },
  interactionKey: [],
  x: -999,
  y: -999,
  xDiff: 0,
  yDiff: 0,
  updateCursor: (x, y) => set({ x, y }),
  startDragPage: (data, { initX, initY }, { diffX, diffY }, interactionKey) =>
    set({
      status: "drag",
      current: { type: "page", data },
      x: initX,
      y: initY,
      xDiff: diffX,
      yDiff: diffY,
      interactionKey: interactionKey ? interactionKey : [],
    }),
  startDragAtom: (data, { initX, initY }, { diffX, diffY }, interactionKey) =>
    set({
      status: "drag",
      current: { type: "atom", data },
      x: initX,
      y: initY,
      xDiff: diffX,
      yDiff: diffY,
      interactionKey: interactionKey ? interactionKey : [],
    }),
  releaseDrag: () =>
    set({
      status: "wait",
      current: { type: "none", data: null },
      interactionKey: [],
      x: -999,
      y: -999,
      xDiff: 0,
      yDiff: 0,
    }),
}));
