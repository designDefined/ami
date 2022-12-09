import { IAtom, IPage, IProject } from "./base";

export type IData = IAtom | IPage | IProject;
export type IDataName = "atom" | "page" | "project";

export type ISelectableType =
  | { type: "atom"; data: IAtom }
  | { type: "page"; data: IPage }
  | { type: "project"; data: IProject }
  | { type: "none"; data: null };

export type IAtomInteraction =
  | { interactionType: "click"; to: string; external: boolean }
  | { interactionType: "scroll"; value: "fadeIO" };
