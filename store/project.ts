import create from "zustand";
import {
  Edge,
  EdgeSummary,
  initializeCleanEdge,
  summarizeEdge,
  summarizeEdges,
} from "./base/edge";

interface Project {
  title: string;
  edges: Edge[];
  edgeSummaries: EdgeSummary[];
}

type ProjectStatus = "loading" | "memo" | "styled";

interface ProjectStoreStatus extends Project {
  status: ProjectStatus;
  setTitle: (title: string) => void;
  setEdges: (edges: Edge[]) => void;
}

const initializeProject = () => {
  const emptyEdge = initializeCleanEdge();
  return {
    title: "untitled_project",
    edges: [emptyEdge],
    edgeSummaries: [summarizeEdge(emptyEdge)],
  };
};

export const useProjectStore = create<ProjectStoreStatus>()(
  (set) => {
    const { title, edges, edgeSummaries } =
      initializeProject();
    return {
      title,
      edges,
      edgeSummaries,
      status: "loading",
      setTitle: (title) => set({ title }),
      setEdges: (edges) =>
        set({
          edges,
          edgeSummaries: summarizeEdges(edges),
        }),
    };
  },
);
