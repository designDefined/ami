/******************** Basic ********************/
import { IAtomInteraction } from "./interaction";

export type IIdentifier = string | number;

export interface IWithId<T extends IIdentifier> {
  id: T;
}
export interface IPlaceable {
  isPlaced: "placed" | "notPlaced" | "nowPlacing";
  placedX: number;
  placedY: number;
}

export interface ILoadable {
  loadStatus: "loading" | "success" | "fail";
}

export interface INullable {
  isNull: boolean;
}

/******************** Authorization ********************/
export interface IToken {
  access: string;
  refresh: string;
}
export interface IUser extends IWithId<string> {
  userName: string;
}

/******************** Atom ********************/
export type IAtomType = "text" | "image" | "button";
export type IMarkDownType = "h1" | "h2" | "h3" | "h4" | "p" | "uli" | "oli";
export interface ICommonAtom extends IWithId<string> {
  type: IAtomType;
  markdownType: IMarkDownType;
  markdownDepth: number;
  parentPageId: string;
  content: string;
  //interactions
  interactions: IAtomInteraction[];
  //size
  offsetWidth: number;
  offsetPadding: number;
  //layer
  layer: number;
}
export type ITextAlign = "justify" | "left" | "right" | "center";
export interface ITextAtom extends ICommonAtom, IPlaceable {
  type: "text";
  //font
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontColor: string;
  textAlign: ITextAlign;
  //background
  backgroundColor: string;
  //border
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}
export interface IImageAtom extends ICommonAtom, IPlaceable {
  type: "image";
}

export type IAtom = ITextAtom | IImageAtom;

/******************** Page ********************/
export interface IPage extends IWithId<string>, IPlaceable {
  pageName: string;
  atoms: IAtom[];
  parentProjectId: number;
  //map
  symbolColor: string;
  connectedTo: string[];
  //style
  backgroundColor: string;
  offsetHeight: number;
}

export interface IConnection {}

/******************** Project ********************/
export interface IProject extends IWithId<number> {
  writer: IUser; //read only
  projectName: string;
  pages: IPage[];
}
export type IProjectSummary = Omit<IProject, "pages">;
