import { nanoid } from "nanoid";

export type EdgeMarkDownType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "ul"
  | "ol";

type ListEdgeMarkDownType = "ul" | "ol";
type NormalEdgeMarkDownType = Exclude<
  EdgeMarkDownType,
  ListEdgeMarkDownType
>;

interface BaseEdgeMarkDown {
  id: string;
  type: EdgeMarkDownType;
  innerText: string;
  isEditing: boolean;
}

interface NormalEdgeMarkDown extends BaseEdgeMarkDown {
  type: NormalEdgeMarkDownType;
}

interface ListEdgeMarkDown extends BaseEdgeMarkDown {
  type: ListEdgeMarkDownType;
}

export type EdgeMarkDown =
  | NormalEdgeMarkDown
  | ListEdgeMarkDown;

export type NormalEdgeMarkDownInput = {
  type: EdgeMarkDownType;
  innerText: string;
};
export type ListEdgeMarkDownInput = {
  type: ListEdgeMarkDownType;
  listItems: string[];
};

export const initialNormalEdgeMarkDown =
  (): NormalEdgeMarkDown => ({
    id: nanoid(7),
    type: "p",
    innerText: "",
    isEditing: true,
  });
