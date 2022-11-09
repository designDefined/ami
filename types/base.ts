import { MarkDownType } from "../store/base/markDown";

interface IWithId<T> {
  id: T;
}

export interface IToken {
  access: string;
  refresh: string;
}

export interface IUser extends IWithId<string> {
  user_name: string;
}
export interface IProject extends IWithId<number> {
  writer: IUser;
  project_name: string;
  pages: IPage[];
}

export interface IPage extends IWithId<string> {
  page_name: string;
  atoms: IAtom[];
}

export interface IAtom extends IWithId<string> {
  type: "text" | "image";
  content: string;
  markdown: IMarkdown;
  style: IStyle;
  parent_id: string;
}

interface IMarkdown {
  type: MarkDownType;
  depth: number;
}

type Interaction = "fade_in" | "fade_out" | "slide_in_left" | "slide_in_top";

interface IStyle {
  geometry: { x: number; y: number; width: number };
  interaction: Interaction[];
}
