import { IAtom, IPage, IProject, IUser } from "../../types/base";
import {
  manipulateWithId,
  manipulateWithIds,
} from "../../localApi/arrayFunctions";
import create from "zustand";
import createEmpty from "../../data/createEmpty";
import axios from "axios";
import { isLocal } from "../../localApi/environment";
import {
  localGetProject,
  localPostCurrentProject,
} from "../../localApi/manageLocalStorage";
import { samples } from "../../data/json/samples";

interface ProjectStoreStatus extends IProject {
  load: (Project: IProject) => void;
  setProjectTitle: (title: string) => void;
  setPages: (pages: IPage[]) => void;
  updatePage: (updatedPage: IPage) => void;
  updateAtoms: (atoms: IAtom[]) => void;
  deleteAtom: (atom: IAtom) => void;
}

export const useProjectStore = create<ProjectStoreStatus>()((set) => ({
  ...createEmpty.project(),
  load: (project) => set({ ...project }),
  setProjectTitle: (project_name) => set({ project_name }),
  setPages: (pages) =>
    set({
      pages,
    }),
  updatePage: (updatedPage) =>
    set((state) => ({ pages: manipulateWithId(state.pages)(updatedPage) })),
  updateAtoms: (atoms) =>
    set((state) => {
      if (atoms.length < 1) {
        return state;
      }
      const page = state.pages.find((page) => page.id === atoms[0].parent_id);
      if (page) {
        const updatedPage: IPage = {
          ...page,
          atoms: manipulateWithIds(page.atoms)(atoms),
        };
        return {
          pages: manipulateWithId(state.pages)(updatedPage),
        };
      } else {
        return state;
      }
    }),
  deleteAtom: (atom) =>
    set((state) => {
      const page = state.pages.find((page) => page.id === atom.parent_id);
      if (page) {
        if (page.atoms.length < 2) return state;
        const updatedPage = {
          ...page,
          atoms: page.atoms.filter((at) => at.id !== atom.id),
        };
        return {
          pages: manipulateWithId(state.pages)(updatedPage),
        };
      } else {
        alert("wrong parent");
        return state;
      }
    }),
}));
//
// export const postNewProject = async () => {
//   const { writer, project_name, pages } = useProjectStore.getState();
//   localPostNewProject({ writer, project_name, pages });
//
//   if (isLocal) {
//     try {
//       const response = await axios.post("/api/project", {
//         writer,
//         project_name,
//         pages,
//       });
//       return Promise.resolve(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//   }
// };

export const postCurrentProject = async () => {
  const { id, writer, project_name, pages } = useProjectStore.getState();
  const { load } = useProjectStore.getState();
  if (isLocal) {
    try {
      const response = await axios.post(`/api/project/${id}`, {
        id,
        writer,
        project_name,
        pages,
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    localPostCurrentProject(id, { id, writer, project_name, pages });
  }
};

export const getProject = async (id: number): Promise<boolean> => {
  const { load } = useProjectStore.getState();
  if (id < 1) {
    return false;
  } else if (id < 5) {
    if (localGetProject(id)) {
      load(localGetProject(id));
    } else {
      load(samples[id - 1]);
    }
    return true;
  } else if (id < 10) {
    if (localGetProject(id)) {
      load(localGetProject(id));
    }
    return true;
  } else {
    return false;
  }
};
