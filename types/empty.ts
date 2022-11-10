import { IAtom, IPage, IProject, IToken, IUser } from "./base";
import { nanoid } from "nanoid";

export const emptyId = "empty_id" as const;

const token = (): IToken => ({
  access: "",
  refresh: "",
});

const user = (): IUser => ({
  id: emptyId,
  user_name: "empty_user",
});

const project = (id: number = -1): IProject => ({
  id,
  writer: user(),
  project_name: "new_project",
  pages: [page()],
});

const page = (): IPage => {
  const id = nanoid(5);
  return {
    id,
    page_name: "new_page",
    atoms: [atom(id)],
  };
};

const atom = (parent_id: string, depth: number = 0): IAtom => ({
  id: nanoid(10),
  type: "text",
  content: "",
  parent_id,
  markdown: { type: "p", depth },
  style: { geometry: { x: -9999, y: -9999, width: 0 }, interaction: [] },
});

const createEmpty = { token, user, project, page, atom };

export default createEmpty;
