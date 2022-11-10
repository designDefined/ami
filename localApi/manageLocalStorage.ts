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

export const localPostNewProject = (initial: Partial<IProject>) => {
  const mine = localGetMine();
  const id = mine ? mine.length + 5 : 5;
  const data = { ...initial, id };
  if (mine) {
    localStorage.setItem(
      MYPROJECT,
      JSON.stringify([
        ...mine,
        {
          id: data.id,
          writer: data.writer,
          project_name: data.project_name,
        },
      ]),
    );
  } else {
    localStorage.setItem(
      MYPROJECT,
      JSON.stringify([
        {
          id: data.id,
          writer: data.writer,
          project_name: data.project_name,
        },
      ]),
    );
  }
  localStorage.setItem(PROJECT(id), JSON.stringify(data));
};

export const localPostCurrentProject = (id: number, data: IProject) => {
  localStorage.setItem(PROJECT(id), JSON.stringify(data));
};
