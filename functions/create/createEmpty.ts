import { nanoid } from "nanoid";
import { IToken } from "../../types/old/base";
import { IUser } from "../../types/general";
import { IProject } from "../../types/project";
import { IPage } from "../../types/page";
import { IImageAtom, ITextAtom } from "../../types/atom";

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
    pageName: "새 페이지",
    parentProjectId: projectId,
    atoms: [textAtom(id)],
    //position
    isPlaced: "notPlaced",
    placedX: -1,
    placedY: -1,
    //map
    symbolColor: "#bbbbbb",
    connectedPage: [],
    //style
    backgroundColor: "transparent",
    offsetHeight: 937,
  };
};

const textAtom = (parentId: string, depth: number = 0): ITextAtom => ({
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
  fontWeight: 200,
  fontColor: "#000000",
  textAlign: "center",
  //background
  backgroundColor: "transparent",
  //border
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 0,
  //layer
  layer: 5,
  //interaction
  extension: [],
});

const imageAtom = (parentId: string, depth: number = 0): IImageAtom => ({
  id: nanoid(),
  parentPageId: parentId,
  //markdown
  type: "image",
  markdownType: "image",
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
  //layer
  layer: 1,
  //interaction
  extension: [],
});

const createEmpty = { token, user, project, page, textAtom, imageAtom };

export default createEmpty;
