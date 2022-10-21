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

export const initialCleanEdge = (): CleanEdge => ({
  id: nanoid(10),
  type: "clean",
  name: "untitled_edge",
  contents: [initialNormalEdgeMarkDown()],
});
