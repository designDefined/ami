import { IIdentifiable, IPlaceable } from "./general";
import { IAtom } from "./atom";

export type IPageId = string;
const pageNumberProperties = ["offsetHeight"] as const;
const pageStringProperties = [
  "pageName",
  "symbolColor",
  "backgroundColor",
] as const;

export type IPageNumberProperty = typeof pageNumberProperties[number];
export type IPageStringProperty = typeof pageStringProperties[number];

export interface IPage
  extends IIdentifiable<IPageId>,
    IPlaceable,
    Record<IPageNumberProperty, number>,
    Record<IPageStringProperty, string> {
  atoms: IAtom[];
}
