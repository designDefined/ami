import { nanoid } from "nanoid";
import { Edge, EdgeSummary, EdgeType, summarizeEdge } from "./edge";

export type MarkDownType = "h1" | "h2" | "h3" | "h4" | "p" | "uli" | "oli";

export interface MarkDown {
  id: string;
  type: MarkDownType;
  innerText: string;
  depth: number;
  parent_id: string;
}

export const createNewMarkDownFrom = (source: MarkDown): MarkDown => {
  const type = source.type === ("uli" || "oli") ? source.type : "p";
  return {
    ...source,
    id: nanoid(10),
    type: type,
    innerText: "",
  };
};

export const createDefaultMarkDownAt = (parent_id: string): MarkDown => ({
  id: nanoid(10),
  type: "p",
  innerText: "",
  depth: 0,
  parent_id,
});

//
// export const initialNormalEdgeMarkDown =
//   (): MarkDown => ({
//     id: nanoid(7),
//     type: "p",
//     innerText: "",
//     depth: 0,
//   });
