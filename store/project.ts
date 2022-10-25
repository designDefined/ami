import create from "zustand";
import {
  Edge,
  EdgeSummary,
  initializeCleanEdge,
  summarizeEdge,
  summarizeEdges,
} from "./base/edge";
import {
  EdgeMarkDown,
  NormalEdgeMarkDownInput,
  initialNormalEdgeMarkDown,
  ListEdgeMarkDownInput,
} from "./base/edgeMarkDown";
import _ from "lodash";
import {
  manipulateWithId,
  manipulateWithIds,
} from "../api/arrayFunctions";

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
    markDown: EdgeMarkDown,
    input: NormalEdgeMarkDownInput | ListEdgeMarkDownInput,
  ) => void;
  // submitMarkDown: (
  //   edge: Edge,
  // ) => (markDown: EdgeMarkDown) => void;
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
      updateMarkDown: (edge, markDown, input) =>
        set((state) => {
          const emptyMarkDown =
            input.type === ("ul" || "ol")
              ? initialNormalEdgeMarkDown()
              : initialNormalEdgeMarkDown();
          const updatedMarkDown = {
            ...markDown,
            ...input,
            isEditing: false,
          };
          const updatedEdge: Edge = {
            ...edge,
            contents: manipulateWithIds(edge.contents)([
              updatedMarkDown,
              emptyMarkDown,
            ]),
          };
          return {
            edges: manipulateWithId(state.edges)(
              updatedEdge,
            ),
          };
        }),
    };
  },
);
