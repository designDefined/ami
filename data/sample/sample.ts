import { IProject, IProjectSummary } from "../../types/base";
import { sampleProjectData } from "./project";
import { sampleTopProjectListData } from "./projectList";

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
