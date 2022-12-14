import { IMarkdownType, ITextAtom } from "../../../../types/atom";
import createEmpty from "../../../../functions/create/createEmpty";
import { useProject } from "../../../../store/project";

const projectStore = useProject;

export const createTextAtom = (
  parentId: string,
  markdownType: Exclude<IMarkdownType, "image">,
  content?: string,
) => {
  const newAtom = {
    ...createEmpty.textAtom(parentId),
    markdownType,
    content: content ? content : "",
  };
  projectStore.getState().manipulateAtom(newAtom);
};

export const initializeTextAtom = (atom: ITextAtom): ITextAtom => {
  const styleToOverwrite: Partial<ITextAtom> = {};
  switch (atom.markdownType) {
    case "h1":
      styleToOverwrite.fontSize = 104;
      styleToOverwrite.fontWeight = 900;
      styleToOverwrite.offsetPadding = 30;
      break;
    case "h2":
      styleToOverwrite.fontSize = 72;
      styleToOverwrite.fontWeight = 700;
      styleToOverwrite.offsetPadding = 20;
      break;
    case "h3":
      styleToOverwrite.fontSize = 54;
      styleToOverwrite.fontWeight = 700;
      styleToOverwrite.offsetPadding = 10;
      break;
    case "h4":
      styleToOverwrite.fontSize = 40;
      styleToOverwrite.fontWeight = 400;
      break;
    case "p":
      styleToOverwrite.textAlign = "justify";
      break;
  }
  return { ...atom, ...styleToOverwrite };
};

export const createPage = (name: string) => {
  const newPage = createEmpty.page(projectStore.getState().id);
  projectStore.getState().manipulatePage({
    ...newPage,
    pageName: name,
  });
};
