import { IProjectSum } from "../../types/base";
import create from "zustand";
import axios from "axios";
import { isLocal } from "../../localApi/environment";
import { allSample } from "../../data/samples";
import { localGetAll, localGetMine } from "../../localApi/manageLocalStorage";

interface ProjectsListStatus {
  all: IProjectSum[];
  my: IProjectSum[];
  load: (all: IProjectSum[]) => void;
  loadMine: (mine: IProjectSum[]) => void;
}

export const useProjectsListStore = create<ProjectsListStatus>()((set) => ({
  all: [],
  my: [],
  load: (all) => set({ all }),
  loadMine: (mine) => set({ my: mine }),
}));

export const getProjects = async () => {
  const { load } = useProjectsListStore.getState();
  if (isLocal) {
    try {
      const response = await axios.get<IProjectSum[]>("/api/projects");
      load(response.data);
    } catch (e) {
      console.log(e);
    }
  } else {
    if (localGetAll()) {
      load(localGetAll());
    } else {
      load(allSample);
    }
  }
  if (localGetMine()) {
    load(localGetMine());
  }
};
