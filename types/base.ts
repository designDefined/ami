import { MarkDownType } from "../store/base/markDown";

interface IWithId {
  id: string;
}

export interface IToken {
  access: string;
  refresh: string;
}

export interface IUser extends IWithId {
  user_name: string;
}
export interface IProject extends IWithId {
  writer: IUser;
  project_name: string;
}

export interface IPage extends IWithId {
  page_name: string;
}

export interface IAtom extends IWithId {
  type: "text" | "image";
  content: string;
  markdown: IMarkdown;
  style: IStyle;
}

interface IMarkdown {
  type: MarkDownType;
  depth: number;
  parent_id: string;
}

type Interaction = "fade_in" | "fade_out" | "slide_in_left" | "slide_in_top";

interface IStyle {
  geometry: { x: number; y: number; width: number };
  interaction: Interaction[];
}
