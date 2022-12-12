import { IProjectSummary } from "../../types/old/base";
import { sampleProjectData } from "./project";
import { sampleTopProjectListData } from "./projectList";
import { IProject } from "../../types/project";

export const sampleLength = 4;

const project = (id: number): IProject | null => {
  if (id <= sampleLength) {
    return sampleProjectData[id - 1];
  } else {
    return null;
  }
};
const projectList = (): { top: IProjectSummary[] } => ({
  top: sampleTopProjectListData,
});

const getSample = { project, projectList };
export default getSample;
