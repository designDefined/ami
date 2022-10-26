import create from "zustand";
import { Edge } from "./base/edge";
import { MarkDown } from "./base/markDown";
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
  deleteMarkDown: (markDown: MarkDown) => void;
}

export const useProjectStore = create<ProjectStoreStatus>()((set) => ({
  title: "",
  edges: [],
  status: "memo",
  setProjectTitle: (title) => set({ title }),
  setEdges: (edges) =>
    set({
      edges: edges,
    }),
  updateMarkDowns: (markDowns) =>
    set((state) => {
      if (markDowns.length < 1) {
        return state;
      }
      const edge = _.find(
        state.edges,
        (edge) => edge.id === markDowns[0].parent_id,
      );
      if (edge) {
        const updatedEdge: Edge = {
          ...edge,
          contents: manipulateWithIds(edge.contents)(markDowns),
        };
        return {
          edges: manipulateWithId(state.edges)(updatedEdge),
        };
      } else {
        console.log(markDowns);
        return state;
      }
    }),
  deleteMarkDown: (markDown) =>
    set((state) => {
      const edge = _.find(
        state.edges,
        (edge) => edge.id === markDown.parent_id,
      );
      if (edge) {
        if (edge.contents.length < 2) return state;
        const updatedEdge = {
          ...edge,
          contents: edge.contents.filter((md) => md.id !== markDown.id),
        };
        return {
          edges: manipulateWithId(state.edges)(updatedEdge),
        };
      } else {
        alert("wrong parent");
        return state;
      }
    }),
}));
