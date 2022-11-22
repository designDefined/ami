import create from "zustand";
import { ILoadable, IPage, IProject, IUser } from "../types/base";
import codes from "../types/codes";
import { manipulateWithId } from "./helper/manipulateWithId";

interface IProjectStore extends IProject, ILoadable {
  //Basics
  load: (project: IProject) => void;
  clear: () => void;
  reload: () => void;
  //Project Depth
  setProjectName: (name: string) => void;
  //Page Depth
  setPages: (Pages: IPage[]) => void;
  manipulatePage: (page: IPage | IPage[]) => void;
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
}));
