import { createDefaultMarkDownAt, MarkDown } from "./markDown";
import { nanoid } from "nanoid";
import _ from "lodash";
import { manipulateWithId } from "../../api/arrayFunctions";

export type EdgeType = "clean" | "styled";

interface BaseEdge {
  id: string;
  type: EdgeType;
  name: string;
  contents: MarkDown[];
}

interface CleanEdge extends BaseEdge {
  type: "clean";
}

interface StyledEdge extends BaseEdge {
  type: "styled";
}

export type Edge = CleanEdge | StyledEdge;

export type EdgeSummary = Omit<Edge, "contents">;

export const defaultEdge: Edge = {
  id: "default",
  type: "clean",
  name: "DEFAULT_EDGE",
  contents: [],
};

export const createCleanEdgeWith = (
  id: string,
  markDown: MarkDown,
): CleanEdge => ({
  id: id,
  type: "clean",
  name: "untitled_edge",
  contents: [markDown],
});

export const summarizeEdge = ({ id, type, name }: Edge): EdgeSummary => ({
  id,
  type,
  name,
});

export const summarizeEdges = (edges: Edge[]): EdgeSummary[] =>
  edges.map((edge) => summarizeEdge(edge));
