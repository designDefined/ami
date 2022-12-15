import { sampleProjectData } from "./project";
import { sampleTopProjectListData } from "./projectList";
import { IProject } from "../../types/project";
import { IProjectSummary } from "../../types/old/base";

export const sampleLength = 1;

const project = (id: number): IProject | null => {
  if (id <= sampleLength) {
    return sampleProjectData[id];
  } else {
    return null;
  }
};
const projectList = (): { top: IProjectSummary[] } => ({
  top: sampleTopProjectListData,
});

const getSample = { project, projectList };
export default getSample;
