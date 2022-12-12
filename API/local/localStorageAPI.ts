import { IProjectSummary } from "../../types/old/base";
import {
  localEmptyData,
  LocalPost,
  LocalResponse,
  localSuccess,
  localWrongKey,
} from "./types";
import getSample, { sampleLength } from "../../data/sample/sample";
import { IProject } from "../../types/project";

const TOP_PROJECTS = "ami_top_projects" as const;
const MY_PROJECTS = "ami_my_projects" as const;
const PROJECT = (id: number) => `ami_project_${id}` as const;

const getTopProjects = async (): Promise<LocalResponse<IProjectSummary[]>> => {
  try {
    const stringData = await localStorage.getItem(TOP_PROJECTS);
    if (stringData) {
      const jsonData = JSON.parse(stringData) as IProjectSummary[];
      return localSuccess(jsonData);
    } else {
      const sample = getSample.projectList().top;
      if (sample) {
        return localSuccess(sample);
      } else {
        return Promise.reject(localEmptyData());
      }
    }
  } catch (e) {
    return Promise.reject(localWrongKey());
  }
};

const getMyProjects = async (): Promise<LocalResponse<IProjectSummary[]>> => {
  try {
    const stringData = await localStorage.getItem(MY_PROJECTS);
    if (stringData) {
      const jsonData = JSON.parse(stringData) as IProjectSummary[];
      return localSuccess(jsonData);
    } else {
      return Promise.reject(localEmptyData());
    }
  } catch (e) {
    return Promise.reject(localWrongKey());
  }
};

const getProjectById = async (id: number): Promise<LocalResponse<IProject>> => {
  try {
    const stringData = await localStorage.getItem(PROJECT(id));
    if (stringData) {
      const jsonData = JSON.parse(stringData) as IProject;
      return localSuccess(jsonData);
    } else {
      const sample = getSample.project(id);
      if (sample) {
        return localSuccess(sample);
      } else {
        return Promise.resolve(localWrongKey());
      }
    }
  } catch (e) {
    return Promise.resolve(localWrongKey());
  }
};

const postProjectById = async (data: IProject): Promise<LocalPost> => {
  const stringData = JSON.stringify(data);
  localStorage.setItem(PROJECT(data.id), stringData);
  return Promise.resolve({ success: true });
};

const localStorageAPI = {
  getTopProjects,
  getMyProjects,
  getProjectById,
  postProjectById,
};
export default localStorageAPI;
