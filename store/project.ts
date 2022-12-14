import create from "zustand";
import codes from "../types/codes";
import { findAtomParent } from "./helper/manipulateWithParent";
import { IProject } from "../types/project";
import { ILoadable } from "../types/general";
import { IPage } from "../types/page";
import { IAtom } from "../types/atom";

import {
  IManipulateWithIdConfig,
  manipulateWithId,
} from "./helper/manipulateWithId";

export type IEditStatus = "memo" | "weave" | "preview";

interface IProjectStore extends IProject, ILoadable {
  //status
  editStatus: IEditStatus;
  pageStatus: number;
  setEditStatus: (editStatus: IEditStatus) => void;
  setPageStatus: (pageNum: number) => void;
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
  pageStatus: 0,
};

export const useProject = create<IProjectStore>()((set) => ({
  ...loadingProject,
  loadStatus: "loading",
  editStatus: "weave",
  pageStatus: -1,
  setEditStatus: (editStatus: IEditStatus) => set({ editStatus }),
  setPageStatus: (pageNum) => set({ pageStatus: pageNum }),
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
