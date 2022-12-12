import { IIdentifiable, IUser } from "./general";
import { IPage } from "./page";

const projectStringProperties = ["projectName"] as const;
export type IProjectStringProperty = typeof projectStringProperties[number];

export interface IProject
  extends IIdentifiable<number>,
    Record<IProjectStringProperty, string> {
  writer: IUser;
  pages: IPage[];
}
