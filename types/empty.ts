import { IAtom, IPage, IProject, IToken, IUser } from "./base";

export const emptyId = "empty_id" as const;

const token = (): IToken => ({
  access: "",
  refresh: "",
});

const user = (): IUser => ({
  id: emptyId,
  user_name: "empty_user",
});

const project = (): IProject => ({
  id: -1,
  writer: user(),
  project_name: "",
  pages: [],
});

const page = (): IPage => ({
  id: emptyId,
  page_name: "",
  atoms: [],
});

const atom = (): IAtom => ({
  id: emptyId,
  type: "text",
  content: "",
  parent_id: "",
  markdown: { type: "p", depth: 0 },
  style: { geometry: { x: -9999, y: -9999, width: 0 }, interaction: [] },
});

const createEmpty = { token, user, project, page, atom };

export default createEmpty;
