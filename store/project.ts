import create from "zustand";
import {
  createCleanEdgeWith,
  defaultEdge,
  Edge,
  EdgeSummary,
  summarizeEdge,
  summarizeEdges,
} from "./base/edge";
import { createDefaultMarkDownAt, MarkDown } from "./base/markDown";
import _ from "lodash";
import { manipulateWithId, manipulateWithIds } from "../api/arrayFunctions";

interface Project {
  title: string;
  edges: Edge[];
}

type ProjectStatus = "loading" | "memo" | "styled";

interface ProjectStoreStatus extends Project {
  status: ProjectStatus;
  setProjectTitle: (title: string) => void;
  setEdges: (edges: Edge[]) => void;
  updateMarkDowns: (markDowns: MarkDown[]) => void;
}

const initializeProject = () => {
  const firstMarkDown = createDefaultMarkDownAt(defaultEdge);
  const firstEdge = createCleanEdgeWith(firstMarkDown);
  firstMarkDown.parent = firstEdge;
  return {
    title: "untitled_project",
    edges: [firstEdge],
  };
};

export const useProjectStore = create<ProjectStoreStatus>()((set) => {
  const { title, edges } = initializeProject();
  return {
    title,
    edges,
    status: "memo",
    setProjectTitle: (title) => set({ title }),
    setEdges: (edges) =>
      set({
        edges,
      }),
    updateMarkDowns: (markDowns) =>
      set((state) => {
        if (markDowns.length < 1) {
          return state;
        }
        const edge = _.find(
          state.edges,
          (edge) => edge.id === markDowns[0].parent.id,
        );
        if (edge) {
          const updatedEdge: Edge = {
            ...edge,
            contents: manipulateWithIds(edge.contents)(markDowns),
          };
          markDowns.forEach((md) => {
            md.parent = updatedEdge;
          });
          return {
            edges: manipulateWithId(state.edges)(updatedEdge),
          };
        } else {
          alert("wrong parent");
          return state;
        }
      }),
  };
});
