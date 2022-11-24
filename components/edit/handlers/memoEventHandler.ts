import { useProjectStore } from "../../../store/api/project";
import { useSelectedAtomStore } from "../../../store/api/selectedAtom";
import { IAtom, IMarkDownType, IPage } from "../../../types/base";
import { findPreviousWithId } from "../../../localApi/arrayFunctions";
import createEmpty from "../../../data/createEmpty";
import { useAtom } from "../../../store/atom";
import { useProject } from "../../../store/project";
import { toast } from "react-toastify";

const project = useProject;
const target = useAtom;

const findAtomParent = (): IPage | false => {
  const { id, parentPageId } = target.getState();
  const result = project
    .getState()
    .pages.find((page) => page.id === parentPageId);
  return result ? result : false;
};
const findAtom = (): IAtom | false => {
  const { id, parentPageId } = target.getState();
  const parent = project
    .getState()
    .pages.find((page) => page.id === parentPageId);
  const result = parent ? parent.atoms.find((atom) => atom.id === id) : false;
  return result ? result : false;
};

//const changeAtom = (partialAtom : Partial<IAtom>):IAtom=>

// const changedAtom = (
//   type: IMarkDownType = selectedAtom.getState().source[0].markdown.type,
//   input: string = selectedAtom.getState().input,
// ): IAtom => ({
//   ...selectedAtom.getState().source[0],
//   markdown: { ...selectedAtom.getState().source[0].markdown, type },
//   content: input,
// });
//
// const findAtomBefore = (atom: IAtom) => {
//   const page = findAtomParent(atom);
//   if (page) {
//     return findPreviousWithId(page.atoms)(atom);
//   }
//   return false;
// };
//
// export const handleClickAtom =
//   (clickedMD: IAtom): React.MouseEventHandler<HTMLLIElement> =>
//   (e) => {
//     e.stopPropagation();
//     if (selectedAtom.getState().source.length > 0) {
//       project.getState().updateAtoms([changedAtom()]);
//     }
//     selectedAtom.getState().select(clickedMD);
//   };
//
export const handleKeyDownAtom: React.KeyboardEventHandler<
  HTMLTextAreaElement
> = (e) => {
  const { isNull, id, content, markdownType } = target.getState();
  if (!isNull) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const sourceAtom = findAtom();
        if (sourceAtom) {
          const changedAtom = { ...sourceAtom, content };
          const newAtom = createEmpty.atom(
            changedAtom.parentPageId,
            changedAtom.markdownDepth,
          );
          project.getState().manipulateAtom([changedAtom, newAtom]);
          target.getState().load(newAtom);
        } else {
          toast.error("Fail to Handle Keydown Atom");
        }
        break;
      /*
      case "Backspace":
        if (content === "" && markdownType !== "p") {
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
        */
      default:
        break;
    }
  }
};
//
// export const handleBlurAtom =
//   (blurredAtom: IAtom): React.FocusEventHandler<HTMLTextAreaElement> =>
//   (e) => {
//     if (selectedAtom.getState().source.length > 0) {
//       project.getState().updateAtoms([changedAtom()]);
//     }
//     selectedAtom.getState().deselect();
//   };
//
// export const handleChangeMDType = (type: IMarkDownType) => {
//   const newAtom = changedAtom(type);
//   project.getState().updateAtoms([newAtom]);
//   selectedAtom.getState().select(newAtom);
// };
//
// export const handleChangeSelectedInput: React.ChangeEventHandler<
//   HTMLTextAreaElement
// > = (e) => {
//   let input = e.target.value;
//   if (input.length < 1) {
//   } else if (input.length === 1) {
//   } else {
//     let sharpCount = 0;
//     for (let i = 0; i < input.length; i++) {
//       if (input[i] === "#") {
//         sharpCount++;
//       } else if (input[i] === " ") {
//         if (
//           sharpCount === 1 ||
//           sharpCount === 2 ||
//           sharpCount === 3 ||
//           sharpCount === 4
//         ) {
//           const newMarkDown = changedAtom(
//             `h${sharpCount}`,
//             input.slice(sharpCount + 1),
//           );
//           project.getState().updateAtoms([newMarkDown]);
//           selectedAtom.getState().select(newMarkDown);
//           return;
//         }
//         break;
//       } else {
//         break;
//       }
//     }
//   }
//   selectedAtom.getState().setInput(input);
// };
/*
export const handleAddPage: React.MouseEventHandler<HTMLButtonElement> = (
  e,
) => {
  const { pages, setPages } = project.getState();
  project.getState().setPages([...pages, createEmpty.page()]);
};
*/
