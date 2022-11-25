import create from "zustand";
import { IAtom, ILoadable, IPage, IProject, IUser } from "../types/base";
import codes from "../types/codes";
import {
  IManipulateWithIdConfig,
  manipulateWithId,
} from "./helper/manipulateWithId";
import { findAtomParent } from "./helper/manipulateWithParent";

export type IEditStatus = "memo" | "weave" | "preview";

interface IProjectStore extends IProject, ILoadable {
  editStatus: IEditStatus;
  setEditStatus: (editStatus: IEditStatus) => void;
  //Basics
  load: (project: IProject) => void;
  clear: () => void;
  reload: () => void;
  //Project Depth
  setProjectName: (name: string) => void;
  //Page Depth
  setPages: (Pages: IPage[]) => void;
  manipulatePage: (
    page: IPage | IPage[],
    config?: Partial<IManipulateWithIdConfig>,
  ) => void;
  //Atom Depth
  manipulateAtom: (
    atom: IAtom | IAtom[],
    config?: Partial<IManipulateWithIdConfig>,
  ) => void;
}

const loadingProject = {
  id: -1,
  writer: { id: codes.noUser, userName: codes.noUser },
  projectName: codes.noProject,
  pages: [],
};

export const useProject = create<IProjectStore>()((set) => ({
  ...loadingProject,
  loadStatus: "loading",
  editStatus: "memo",
  setEditStatus: (editStatus: IEditStatus) => set({ editStatus }),
  //Basics
  load: (project) => set({ ...project, loadStatus: "success" }),
  clear: () => set({ ...loadingProject, loadStatus: "loading" }),
  reload: () => set({ loadStatus: "loading" }),

  //Project Depth
  setProjectName: (name) => set({ projectName: name }),

  //Page Depth
  setPages: (pages) => set({ pages: pages }),
  manipulatePage: (page, config) =>
    set((state) => ({ pages: manipulateWithId(state.pages, page, config) })),

  //Atom Depth
  manipulateAtom: (atom, config) =>
    set((state) => {
      const parentPage = findAtomParent(state.pages, atom);
      if (!parentPage) {
        return state;
      }
      return {
        pages: manipulateWithId(state.pages, {
          ...parentPage,
          atoms: manipulateWithId(parentPage.atoms, atom, config),
        }),
      };
    }),
}));
