import sample1 from "./1.json";
import sample2 from "./2.json";
import sample3 from "./3.json";
import sample4 from "./4.json";
import all from "./all.json";

import { IProject, IProjectSum } from "../../../types/old/base";

// @ts-ignore
export const samples: IProject[] = [sample1, sample2, sample3, sample4];
export const allSample: IProjectSum[] = all.all_projects;
