import create from "zustand";
import {
  Edge,
  EdgeSummary,
  initializeCleanEdge,
  summarizeEdge,
  summarizeEdges,
} from "./base/edge";
import { EdgeMarkDown } from "./base/edgeMarkDown";
import _ from "lodash";
import { manipulateWithId } from "../api/arrayFunctions";

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
  updateEdge: (target: Edge) => void;
  updateMarkDown: (
    edge: Edge,
  ) => (markDown: EdgeMarkDown) => void;
}

const initializeProject = () => {
  const emptyEdge = initializeCleanEdge();
  return {
    title: "untitled_project",
    edges: [emptyEdge],
    edgeSummaries: [summarizeEdge(emptyEdge)],
  };
};

const updateEdgeOfEdges =
  (edges: Edge[]) =>
  (edge: Edge): Edge[] => {
    const indexOfEdge = _.findIndex(edges, { id: edge.id });
    if (indexOfEdge < 0) {
      //add edge
    }
    return [];
  };

const updateMarkDownOfEdges =
  (edges: Edge[]) =>
  (edge: Edge) =>
  (markDown: EdgeMarkDown): Edge[] => {
    return [];
  };

export const useProjectStore = create<ProjectStoreStatus>()(
  (set) => {
    const { title, edges, edgeSummaries } =
      initializeProject();
    return {
      title,
      edges,
      edgeSummaries,
      status: "memo",
      setTitle: (title) => set({ title }),
      setEdges: (edges) =>
        set({
          edges,
          edgeSummaries: summarizeEdges(edges),
        }),
      updateEdge: (target, indexToAdd?: number) =>
        set((state) => ({
          edges: manipulateWithId(state.edges)(
            target,
            indexToAdd,
          ),
        })),
      updateMarkDown:
        (edge) => (markDown, indexToAdd?: number) =>
          set((state) => {
            const newEdge: Edge = {
              ...edge,
              contents: manipulateWithId(edge.contents)(
                markDown,
              ),
            };
            return {
              edges: manipulateWithId(state.edges)(newEdge),
            };
          }),
    };
  },
);
