import { IProjectSummary } from "../../types/base";
import {
  localEmptyData,
  LocalResponse,
  localSuccess,
  localWrongKey,
} from "./types";

const TOP_PROJECTS = "ami_top_projects" as const;
const MY_PROJECTS = "ami_my_projects" as const;
const PROJECT = (id: number) => `ami_project_${id}` as const;

export const getTopProjects = async (): Promise<
  LocalResponse<IProjectSummary[]>
> => {
  try {
    const stringData = await localStorage.getItem(TOP_PROJECTS);
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

export const getMyProjects = async (): Promise<
  LocalResponse<IProjectSummary[]>
> => {
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

export const getProjectById = async (
  id: number,
): Promise<LocalResponse<IProjectSummary[]>> => {
  try {
    const stringData = await localStorage.getItem(PROJECT(id));
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
