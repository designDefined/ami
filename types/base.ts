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

export type IProjectSum = Pick<IProject, "id" | "writer" | "project_name">;

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

export type IMarkDownType = "h1" | "h2" | "h3" | "h4" | "p" | "uli" | "oli";

interface IMarkdown {
  type: IMarkDownType;
  depth: number;
}

type Interaction = "fade_in" | "fade_out" | "slide_in_left" | "slide_in_top";

interface IStyle {
  geometry: { x: number; y: number; width: number };
  interaction: Interaction[];
}
