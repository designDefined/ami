import create from "zustand";
import { Edge, initialCleanEdge } from "./base/edge";

interface Project {
  title: string;
  edges: Edge[];
}

interface ProjectStoreStatus extends Project {
  setTitle: (title: string) => void;
}

const initialProject = {
  title: "untitled_project",
  edges: [initialCleanEdge()],
};

export const useProjectStore = create<ProjectStoreStatus>()(
  (set) => ({
    title: initialProject.title,
    edges: initialProject.edges,
    setTitle: (title) => set({ title }),
  }),
);
