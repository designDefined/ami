import { IPlaceable, IIdentifiable } from "./general";
import { IPageId } from "./page";
import { AtomExtension } from "./atomExtension";

/*************** custom type constants ***************/
export type IAtomId = string;
export const atomTypes = ["text", "image", "button"] as const;
export const markdownTypes = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "uli",
  "oli",
  "image",
] as const;
export const textAligns = ["center", "justify", "left", "right"] as const;

/*************** property constants ***************/
/********** common **********/
const atomNumberProperties = [
  "markdownDepth",
  "offsetWidth",
  "offsetPadding",
  "layer",
] as const;
const atomStringProperties = ["content"] as const;
/********** text **********/
const textAtomNumberProperties = [
  "fontSize",
  "fontWeight",
  "borderWidth",
  "borderRadius",
] as const;
const textAtomStringProperties = [
  "fontFamily",
  "fontColor",
  "backgroundColor",
  "borderColor",
] as const;

/*************** property types ***************/
/********** basics **********/
export type IAtomType = typeof atomTypes[number];
export type IMarkdownType = typeof markdownTypes[number];
/********** common **********/
export type IAtomNumberProperty = typeof atomNumberProperties[number];
export type IAtomStringProperty = typeof atomStringProperties[number];
/********** text **********/
export type ITextAtomNumberProperty = typeof textAtomNumberProperties[number];
export type ITextAtomStringProperty = typeof textAtomStringProperties[number];
export type ITextAlign = typeof textAligns[number];

/*************** build atom interface ***************/
interface ICommonAtom
  extends IIdentifiable<IAtomId>,
    IPlaceable,
    Record<IAtomNumberProperty, number>,
    Record<IAtomStringProperty, string> {
  readonly parentPageId: IPageId;
  type: IAtomType;
  markDownType: IMarkdownType;
  extension: AtomExtension[];
}

export interface ITextAtom
  extends ICommonAtom,
    Record<ITextAtomNumberProperty, number>,
    Record<ITextAtomStringProperty, string> {
  type: "text";
  markdownTypes: Exclude<IMarkdownType, "image">;
  textAlign: ITextAlign;
}

export interface IImageAtom extends ICommonAtom {
  type: "image";
  markdownTypes: "image";
}

export type IAtom = ITextAtom | IImageAtom;