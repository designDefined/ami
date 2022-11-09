import { IAtom, IPage, IProject, IUser } from "../../types/base";
import { manipulateWithId, manipulateWithIds } from "../../api/arrayFunctions";
import create from "zustand";
import createEmpty from "../../types/empty";
import axios from "axios";
import { useSelectedAtomStore } from "./selectedAtom";

interface ProjectStoreStatus extends IProject {
  load: (Project: IProject) => void;
  setProjectTitle: (title: string) => void;
  setPages: (pages: IPage[]) => void;
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

export const postNewProject = async () => {
  const { writer, project_name, pages } = useProjectStore.getState();
  try {
    const response = await axios.post("/api/project", {
      writer,
      project_name,
      pages,
    });
    return Promise.resolve(response.data);
  } catch (e) {
    console.log(e);
  }
};

export const postCurrentProject = async () => {
  const { id, writer, project_name, pages } = useProjectStore.getState();
  const { load } = useProjectStore.getState();
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
};

export const getProject = async (id: number) => {
  const { load } = useProjectStore.getState();
  try {
    const response = await axios.get<IProject>(`/api/project/${id}`);
    console.log(response.data);
    load(response.data);
    console.log(useProjectStore.getState().id);
  } catch (e) {
    console.log(e);
  }
};
