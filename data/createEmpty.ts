import { IAtom, IPage, IProject, IToken, IUser } from "../types/base";
import { nanoid } from "nanoid";

export const emptyId = "empty_id" as const;

const token = (): IToken => ({
  access: "",
  refresh: "",
});

const user = (): IUser => ({
  id: emptyId,
  userName: "empty_user",
});

const project = (id: number = -1): IProject => ({
  id,
  writer: user(),
  projectName: "new_project",
  pages: [page(id)],
});

const page = (projectId: number): IPage => {
  const id = nanoid();
  return {
    id,
    pageName: "new_page",
    parentProjectId: projectId,
    atoms: [atom(id)],
    //edge
    edgeColor: "#bbbbbb",
    background: "#ffffff",
    offsetHeight: 937,
    isPlaced: false,
    placedX: -1,
    placedY: -1,
  };
};

const atom = (parentId: string, depth: number = 0): IAtom => ({
  id: nanoid(),
  type: "text",
  markdownType: "p",
  markdownDepth: depth,
  content: "",
  parentPageId: parentId,
  offsetWidth: -1,
  fontSize: -1,
  fontColor: "#000000",
  isPlaced: false,
  placedX: -1,
  placedY: -1,
});

const createEmpty = { token, user, project, page, atom };

export default createEmpty;
