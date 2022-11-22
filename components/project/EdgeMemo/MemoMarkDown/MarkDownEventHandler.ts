import { useSelectedMarkDown } from "../../../../nouse/selectedMarkdown";
import { useProjectStore } from "../../../../nouse/project";
import {
  createNewMarkDownFrom,
  MarkDown,
  MarkDownType,
} from "../../../../nouse/base/markDown";
import _ from "lodash";
import { Edge } from "../../../../nouse/base/edge";
import { findPreviousWithId } from "../../../../localApi/arrayFunctions";

const project = useProjectStore;
const selectedMarkDown = useSelectedMarkDown;

const findParent = (markDown: MarkDown): Edge | false => {
  const result = _.find(
    project.getState().edges,
    (edge) => edge.id === markDown.parent_id,
  );
  return result ? result : false;
};

const changedMarkDown = (
  type: MarkDownType = selectedMarkDown.getState().source[0].type,
  input: string = selectedMarkDown.getState().input,
): MarkDown => ({
  ...selectedMarkDown.getState().source[0],
  type,
  innerText: input,
});

const findMDBefore = (markDown: MarkDown) => {
  const edge = findParent(markDown);
  if (edge) {
    return findPreviousWithId(edge.contents)(markDown);
  }
  return false;
};

export const handleClickMD =
  (clickedMD: MarkDown): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.stopPropagation();
    if (selectedMarkDown.getState().source.length > 0) {
      project.getState().updateMarkDowns([changedMarkDown()]);
    }
    selectedMarkDown.getState().select(clickedMD);
  };

export const handleKeyDownMD =
  (
    triggeredMD: MarkDown,
    input: string,
  ): React.KeyboardEventHandler<HTMLTextAreaElement> =>
  (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        const submittedMD = { ...triggeredMD, innerText: input };
        const newMD = createNewMarkDownFrom(submittedMD);
        project.getState().updateMarkDowns([submittedMD, newMD]);
        selectedMarkDown.getState().select(newMD);
        break;
      case "Backspace":
        if (input === "" && triggeredMD.type !== "p") {
          handleChangeMDType("p");
        }
        if (input === "" && triggeredMD.type === "p") {
          const beforeMD = findMDBefore(triggeredMD);
          if (beforeMD) {
            project.getState().deleteMarkDown(triggeredMD);
            selectedMarkDown.getState().select(beforeMD);
          }
        }
        break;
      default:
        break;
    }
  };

export const handleBlurMD =
  (blurredMD: MarkDown): React.FocusEventHandler<HTMLTextAreaElement> =>
  (e) => {
    if (selectedMarkDown.getState().source.length > 0) {
      project.getState().updateMarkDowns([changedMarkDown()]);
    }
    selectedMarkDown.getState().deSelect();
  };

export const handleChangeMDType = (type: MarkDownType) => {
  const newMarkDown = changedMarkDown(type);
  project.getState().updateMarkDowns([newMarkDown]);
  selectedMarkDown.getState().select(newMarkDown);
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
          const newMarkDown = changedMarkDown(
            `h${sharpCount}`,
            input.slice(sharpCount + 1),
          );
          project.getState().updateMarkDowns([newMarkDown]);
          selectedMarkDown.getState().select(newMarkDown);
          return;
        }
        break;
      } else {
        break;
      }
    }
  }
  selectedMarkDown.getState().setInput(input);
};
