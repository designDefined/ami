import { IProjectSum } from "../../types/base";
import create from "zustand";
import axios from "axios";

interface ProjectsListStatus {
  all: IProjectSum[];
  load: (all: IProjectSum[]) => void;
}

export const useProjectsListStore = create<ProjectsListStatus>()((set) => ({
  all: [],
  load: (all) => set({ all }),
}));

export const getProjects = async () => {
  const { load } = useProjectsListStore.getState();
  try {
    const response = await axios.get<IProjectSum[]>("/api/projects");
    load(response.data);
  } catch (e) {
    console.log(e);
  }
};
