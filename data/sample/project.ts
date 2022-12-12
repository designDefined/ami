import { IProject } from "../../types/old/base";
import { sampleUserData } from "./user";
import { nanoid } from "nanoid";
import createEmpty from "../../functions/create/createEmpty";

export const sampleProjectData: IProject[] = [
  {
    id: 1,
    writer: sampleUserData,
    projectName: "AMI 1.0: GrayScale",
    pages: [createEmpty.page(1)],
  },
  {
    id: 2,
    writer: sampleUserData,
    projectName: "반작이는 물방울",
    pages: [],
  },
  {
    id: 3,
    writer: sampleUserData,
    projectName: "빈 샘플",
    pages: [],
  },
  {
    id: 4,
    writer: sampleUserData,
    projectName: "빈 샘플",
    pages: [],
  },
];
