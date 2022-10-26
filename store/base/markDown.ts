import { nanoid } from "nanoid";
import { Edge } from "./edge";

export type MarkDownType = "h1" | "h2" | "h3" | "h4" | "p" | "uli" | "oli";

export interface MarkDown {
  id: string;
  type: MarkDownType;
  innerText: string;
  depth: number;
  parent: Edge;
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

export const createDefaultMarkDownAt = (parent: Edge): MarkDown => ({
  id: nanoid(10),
  type: "p",
  innerText: "",
  depth: 0,
  parent,
});

//
// export const initialNormalEdgeMarkDown =
//   (): MarkDown => ({
//     id: nanoid(7),
//     type: "p",
//     innerText: "",
//     depth: 0,
//   });
