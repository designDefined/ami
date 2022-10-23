import {
  EdgeMarkDown,
  initialNormalEdgeMarkDown,
} from "./edgeMarkDown";
import { nanoid } from "nanoid";

type EdgeType = "clean" | "styled";

interface BaseEdge {
  id: string;
  type: EdgeType;
  name: string;
  contents: EdgeMarkDown[];
}

interface CleanEdge extends BaseEdge {
  type: "clean";
}

interface StyledEdge extends BaseEdge {
  type: "styled";
}

export type Edge = CleanEdge | StyledEdge;

export type EdgeSummary = Omit<Edge, "contents">;

export const initializeCleanEdge = (): CleanEdge => ({
  id: nanoid(10),
  type: "clean",
  name: "untitled_edge",
  contents: [initialNormalEdgeMarkDown()],
});

export const summarizeEdge = ({
  id,
  type,
  name,
}: Edge): EdgeSummary => ({ id, type, name });

export const summarizeEdges = (
  edges: Edge[],
): EdgeSummary[] =>
  edges.map((edge) => summarizeEdge(edge));
