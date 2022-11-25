import { IAtom, IMarkDownType, IPage } from "../../../types/base";
import createEmpty from "../../../data/createEmpty";
import { useProject } from "../../../store/project";
import { useText } from "../../../store/text";
import { findAtomRelatively } from "../../../store/helper/manipulateWithParent";

const projectStore = useProject;
const textStore = useText;

export const onClickAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    textStore.setState({ identifier: atom.id, input: atom.content });
  };

export const onKeyDownAtom =
  (atom: IAtom): React.KeyboardEventHandler<HTMLTextAreaElement> =>
  (e) => {
    const input = textStore.getState().input;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const changedAtom = { ...atom, content: input };
        const newAtom = createEmpty.atom(
          changedAtom.parentPageId,
          changedAtom.markdownDepth,
        );
        projectStore.getState().manipulateAtom([changedAtom, newAtom]);
        textStore.setState({ identifier: newAtom.id, input: newAtom.content });
        break;

      case "Backspace":
        if (input === "" && atom.markdownType !== "p") {
          projectStore
            .getState()
            .manipulateAtom({ ...atom, markdownType: "p" });
          return;
        }
        if (input === "" && atom.markdownType === "p") {
          const beforeAtom = findAtomRelatively(
            projectStore.getState().pages,
            atom,
            -1,
          );
          if (beforeAtom) {
            projectStore.getState().manipulateAtom(atom, { isDelete: true });
            textStore.setState({
              identifier: beforeAtom.id,
              input: beforeAtom.content,
            });
          }
          return;
        }
        break;
      default:
        break;
    }
  };

const countSharp = (source: string): number => {
  const array = source.split("");
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "#") {
      count++;
    } else {
      break;
    }
  }
  return count;
};

export const onChangeInput =
  (atom: IAtom): React.ChangeEventHandler<HTMLTextAreaElement> =>
  (e) => {
    const input: string = e.target.value;
    const split = input.split(" ", 2);
    if (split.length === 2) {
      const [prefix, source] = split;
      /***** Headings (#) *****/
      const sharps = countSharp(prefix);
      if (sharps > 0 && sharps <= 4) {
        const newType = `h${sharps}` as IMarkDownType;
        const newAtom = { ...atom, markdownType: newType, content: source };
        projectStore.getState().manipulateAtom(newAtom);
      }
      /***** ordered list (1.) *****/
      /***** unordered list (-) *****/
    }
    textStore.setState({ input });
  };

export const onBlurAtom =
  (atom: IAtom): React.FocusEventHandler<HTMLTextAreaElement> =>
  (e) => {
    projectStore
      .getState()
      .manipulateAtom({ ...atom, content: textStore.getState().input });
    textStore.getState().clear();
  };

export const onAddPage =
  (): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    const { id, manipulatePage } = projectStore.getState();
    manipulatePage(createEmpty.page(id));
  };

export const onDeletePage =
  (page: IPage | IPage[]): React.MouseEventHandler<HTMLButtonElement> =>
  (e) => {
    const { manipulatePage } = projectStore.getState();
    manipulatePage(page, { isDelete: true });
  };

export const onModifyPageName =
  (page: IPage, input: string): React.MouseEventHandler<HTMLButtonElement> =>
  (e) => {
    const { manipulatePage } = projectStore.getState();
    manipulatePage({ ...page, pageName: input });
  };
