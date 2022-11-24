import create from "zustand";
import { IAtom, ILoadable, IPage, IProject, IUser } from "../types/base";
import codes from "../types/codes";
import { manipulateWithId } from "./helper/manipulateWithId";
import { array } from "prop-types";

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
  manipulatePage: (page: IPage | IPage[]) => void;
  //Atom Depth
  manipulateAtom: (atom: IAtom | IAtom[]) => void;
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
  manipulatePage: (page) =>
    set((state) => ({ pages: manipulateWithId(state.pages, page) })),

  //Atom Depth
  manipulateAtom: (atom) =>
    set((state) => {
      if (Array.isArray(atom)) {
        if (atom.length > 0) {
          const parentPage = state.pages.find(
            (page) => page.id === atom[0].parentPageId,
          );
          if (parentPage) {
            return {
              pages: manipulateWithId(state.pages, {
                ...parentPage,
                atoms: manipulateWithId(parentPage.atoms, atom),
              }),
            };
          } else {
            return state;
          }
        } else {
          return state;
        }
      } else {
        const parentPage = state.pages.find(
          (page) => page.id === atom.parentPageId,
        );
        if (parentPage) {
          return {
            pages: manipulateWithId(state.pages, {
              ...parentPage,
              atoms: manipulateWithId(parentPage.atoms, atom),
            }),
          };
        } else {
          return state;
        }
      }
    }),
}));
