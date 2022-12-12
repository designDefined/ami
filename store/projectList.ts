import create from "zustand";
import { IProjectSummary } from "../types/old/base";

interface IProjectListStore {
  topProjects: IProjectSummary[];
  myProjects: IProjectSummary[];
  setTopProjects: (topProjects: IProjectSummary[]) => void;
  setMyProjects: (myProjects: IProjectSummary[]) => void;
}

export const useProjectList = create<IProjectListStore>()((set) => ({
  topProjects: [],
  myProjects: [],
  setTopProjects: (topProjects) => set({ topProjects }),
  setMyProjects: (myProjects) => set({ myProjects }),
}));
