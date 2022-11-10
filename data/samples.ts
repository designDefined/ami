import sample1 from "./json/1.json";
import sample2 from "./json/2.json";
import sample3 from "./json/3.json";
import sample4 from "./json/4.json";
import all from "./json/all.json";

import { IProject, IProjectSum } from "../types/base";

// @ts-ignore
export const samples: IProject[] = [sample1, sample2, sample3, sample4];
export const allSample: IProjectSum[] = all.all_projects;
