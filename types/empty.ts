import { IAtom, IPage, IProject, IToken, IUser } from "./base";

export const emptyId = "empty_id" as const;

const token = (): IToken => ({
  access: "",
  refresh: "",
});

const user = (): IUser => ({
  id: emptyId,
  user_name: "",
});

const project = (): IProject => ({
  id: emptyId,
  writer: { id: emptyId, user_name: "" },
  project_name: "",
});

const page = (): IPage => ({
  id: emptyId,
  page_name: "",
});

const atom = (): IAtom => ({
  id: emptyId,
  type: "text",
  content: "",
  markdown: { type: "p", depth: 0, parent_id: "" },
  style: { geometry: { x: -9999, y: -9999, width: 0 }, interaction: [] },
});

const createEmpty = { token, user, project, page, atom };

export default createEmpty;
