import { useProjectStore } from "../../../store/api/project";
import { useSelectedAtomStore } from "../../../store/api/selectedAtom";
import { IAtom, IMarkDownType, IPage } from "../../../types/base";
import { findPreviousWithId } from "../../../api/arrayFunctions";
import createEmpty from "../../../types/empty";

const project = useProjectStore;
const selectedAtom = useSelectedAtomStore;

const findAtomParent = (atom: IAtom): IPage | false => {
  const result = project
    .getState()
    .pages.find((page) => page.id === atom.parent_id);
  return result ? result : false;
};

const changedAtom = (
  type: IMarkDownType = selectedAtom.getState().source[0].markdown.type,
  input: string = selectedAtom.getState().input,
): IAtom => ({
  ...selectedAtom.getState().source[0],
  markdown: { ...selectedAtom.getState().source[0].markdown, type },
  content: input,
});

const findAtomBefore = (atom: IAtom) => {
  const page = findAtomParent(atom);
  if (page) {
    return findPreviousWithId(page.atoms)(atom);
  }
  return false;
};

export const handleClickAtom =
  (clickedMD: IAtom): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.stopPropagation();
    if (selectedAtom.getState().source.length > 0) {
      project.getState().updateAtoms([changedAtom()]);
    }
    selectedAtom.getState().select(clickedMD);
  };

export const handleKeyDownAtom =
  (
    triggeredAtom: IAtom,
    input: string,
  ): React.KeyboardEventHandler<HTMLTextAreaElement> =>
  (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const submittedAtom = { ...triggeredAtom, content: input };
        const newAtom = createEmpty.atom(
          submittedAtom.parent_id,
          submittedAtom.markdown.depth,
        );
        project.getState().updateAtoms([submittedAtom, newAtom]);
        selectedAtom.getState().select(newAtom);
        break;
      case "Backspace":
        if (input === "" && triggeredAtom.markdown.type !== "p") {
          handleChangeMDType("p");
        }
        if (input === "" && triggeredAtom.markdown.type === "p") {
          const beforeAtom = findAtomBefore(triggeredAtom);
          if (beforeAtom) {
            project.getState().deleteAtom(triggeredAtom);
            selectedAtom.getState().select(beforeAtom);
          }
        }
        break;
      default:
        break;
    }
  };

export const handleBlurAtom =
  (blurredAtom: IAtom): React.FocusEventHandler<HTMLTextAreaElement> =>
  (e) => {
    if (selectedAtom.getState().source.length > 0) {
      project.getState().updateAtoms([changedAtom()]);
    }
    selectedAtom.getState().deselect();
  };

export const handleChangeMDType = (type: IMarkDownType) => {
  const newAtom = changedAtom(type);
  project.getState().updateAtoms([newAtom]);
  selectedAtom.getState().select(newAtom);
};

export const handleChangeSelectedInput: React.ChangeEventHandler<
  HTMLTextAreaElement
> = (e) => {
  let input = e.target.value;
  if (input.length < 1) {
  } else if (input.length === 1) {
  } else {
    let sharpCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "#") {
        sharpCount++;
      } else if (input[i] === " ") {
        if (
          sharpCount === 1 ||
          sharpCount === 2 ||
          sharpCount === 3 ||
          sharpCount === 4
        ) {
          const newMarkDown = changedAtom(
            `h${sharpCount}`,
            input.slice(sharpCount + 1),
          );
          project.getState().updateAtoms([newMarkDown]);
          selectedAtom.getState().select(newMarkDown);
          return;
        }
        break;
      } else {
        break;
      }
    }
  }
  selectedAtom.getState().setInput(input);
};
