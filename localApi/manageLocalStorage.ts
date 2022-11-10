import { IPage, IProject, IProjectSum, IUser } from "../types/base";

const ALLPROJECT = "ami_all_projects" as const;
const MYPROJECT = "ami_my_projects" as const;
const PROJECT = (id: number): string => `ami_project_${id}`;

export const localGetAll = () => {
  const data = localStorage.getItem(ALLPROJECT);
  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};
export const localGetMine = () => {
  const data = localStorage.getItem(MYPROJECT);
  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};
export const localGetProject = (id: number) => {
  const data = localStorage.getItem(PROJECT(id));
  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

export const localPostMyProject = (mine: IProjectSum[], project: IProject) => {
  localStorage.setItem(MYPROJECT, JSON.stringify(mine));
  localStorage.setItem(PROJECT(project.id), JSON.stringify(project));
};

export const localPostCurrentProject = (id: number, data: IProject) => {
  localStorage.setItem(PROJECT(id), JSON.stringify(data));
};
