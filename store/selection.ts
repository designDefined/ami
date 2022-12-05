import create from "zustand";
import { IAtom, IPage, IProject } from "../types/base";
import { ISelectableType } from "../types/interaction";

interface ISelectionStore {
  current: ISelectableType;
  selectAtom: (atom: IAtom) => void;
  selectPage: (page: IPage) => void;
  selectProject: (project: IProject) => void;
  deselect: () => void;
}

export const useSelection = create<ISelectionStore>()((set) => ({
  current: {
    type: "none",
    data: null,
  },
  selectAtom: (atom) => set({ current: { type: "atom", data: atom } }),
  selectPage: (page) => set({ current: { type: "page", data: page } }),
  selectProject: (project) =>
    set({ current: { type: "project", data: project } }),
  deselect: () => set({ current: { type: "none", data: null } }),
}));