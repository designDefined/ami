import { IProjectSum } from "../../../types/old/base";
import create from "zustand";
import axios from "axios";
import { isLocal } from "../../../localApi/environment";
import { allSample } from "../../data/json/samples";
import {
  localGetAll,
  localGetMine,
  localPostMyProject,
} from "../../../localApi/manageLocalStorage";
import createEmpty from "../../../functions/create/createEmpty";

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
  const { load, loadMine } = useProjectsListStore.getState();
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
    loadMine(localGetMine());
  }
};

export const postMyProject = async () => {
  const { my, loadMine } = useProjectsListStore.getState();
  const id: number = my.length > 0 ? my[my.length - 1].id + 1 : 5;
  const project = createEmpty.project(id);
  const newMy = [...my, project];
  localPostMyProject(newMy, project);
  loadMine(newMy);
  return Promise.resolve({ id });
};
