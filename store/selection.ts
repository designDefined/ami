import create from "zustand";
import { ISelectableType } from "../types/old/interaction";
import { IProject } from "../types/project";
import { IPage } from "../types/page";
import { IAtom } from "../types/atom";

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

export const checkSelectedPage = (target: IPage): boolean => {
  const { type, data } = useSelection.getState().current;
  return type === "page" ? data.id === target.id : false;
};

export const checkSelectedAtom = (
  { type, data }: ISelectableType,
  target: IAtom,
): boolean => (type === "atom" ? data.id === target.id : false);
