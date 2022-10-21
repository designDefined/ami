type EdgeMarkDownType =
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
  type: EdgeMarkDownType;
  isEditing: boolean;
}

interface NormalEdgeMarkDown extends BaseEdgeMarkDown {
  type: NormalEdgeMarkDownType;
  innerText: string;
}

interface ListEdgeMarkDown extends BaseEdgeMarkDown {
  type: ListEdgeMarkDownType;
  listItems: string[];
}

export type EdgeMarkDown =
  | NormalEdgeMarkDown
  | ListEdgeMarkDown;

export const initialNormalEdgeMarkDown =
  (): NormalEdgeMarkDown => ({
    type: "p",
    innerText: "",
    isEditing: true,
  });
