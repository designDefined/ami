import { IWithId } from "./old/base";

export type IIdentifier = string | number;
export interface IIdentifiable<T extends IIdentifier> {
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

export interface IUser extends IWithId<string> {
  userName: string;
}
