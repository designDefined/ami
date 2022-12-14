import { IPlaceable, IIdentifiable } from "./general";
import { IPageId } from "./page";
import { IAtomExtension } from "./atomExtension";

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
export const textAlignsWithLabels: { value: ITextAlign; label: string }[] = [
  "가운데",
  "양쪽",
  "왼쪽",
  "오른쪽",
].map((label, index) => ({
  value: textAligns[index],
  label,
}));

/*************** property constants ***************/
/********** common **********/
const atomNumberProperties = [
  "markdownDepth",
  "offsetWidth",
  "offsetPadding",
  "layer",
  "placedX",
  "placedY",
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
  "textAlign",
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
  markdownType: IMarkdownType;
  extension: IAtomExtension[];
}

export interface ITextAtom
  extends ICommonAtom,
    Record<ITextAtomNumberProperty, number>,
    Record<ITextAtomStringProperty, string> {
  type: "text";
  markdownType: Exclude<IMarkdownType, "image">;
  textAlign: ITextAlign;
}

export interface IImageAtom extends ICommonAtom {
  type: "image";
  markdownType: "image";
}

export type IAtom = ITextAtom | IImageAtom;
