import { IAtom, IPage, IProject, IToken, IUser } from "../../types/base";
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
    backgroundColor: "transparent",
    offsetHeight: 907,
    isPlaced: "notPlaced",
    placedX: -1,
    placedY: -1,
  };
};

const atom = (parentId: string, depth: number = 0): IAtom => ({
  id: nanoid(),
  parentPageId: parentId,
  //markdown
  type: "text",
  markdownType: "p",
  markdownDepth: depth,
  //content
  content: "",
  //position
  isPlaced: "notPlaced",
  placedX: -1,
  placedY: -1,
  //size
  offsetWidth: 400,
  offsetPadding: 0,
  //font
  fontFamily: "inherit",
  fontSize: 24,
  fontWeight: 300,
  fontColor: "#000000",
  textAlign: "justify",
  //background
  backgroundColor: "transparent",
  //border
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 0,
  //layer
  layer: 5,
});

const createEmpty = { token, user, project, page, atom };

export default createEmpty;
