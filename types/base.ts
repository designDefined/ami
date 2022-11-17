/******************** Basic ********************/
export interface IWithId<T> {
  id: T;
}
export interface IPlaceable {
  isPlaced: boolean;
  placedX: number;
  placedY: number;
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
export type IAtomType = "text" | "image";
export type IMarkDownType = "h1" | "h2" | "h3" | "h4" | "p" | "uli" | "oli";
export interface ICommonAtom extends IWithId<string> {
  type: IAtomType;
  parentPageId: string;
}
export interface ITextAtom extends ICommonAtom, IPlaceable {
  markdownType: IMarkDownType;
  content: string;
  //style
  offsetWidth: number;
  fontSize: number;
  fontColor: string;
}
export type IAtom = ITextAtom;

/******************** page ********************/
export interface IPage extends IWithId<string>, IPlaceable {
  pageName: string;
  atoms: IAtom[];
  //edge
  edgeColor: string;
  //style
  background: string;
  offsetHeight: number;
}

/******************** Project ********************/
export interface IProject extends IWithId<number> {
  writer: IUser; //read only
  project_name: string;
  pages: IPage[];
}

export type IProjectSum = Omit<IProject, "pages">;
