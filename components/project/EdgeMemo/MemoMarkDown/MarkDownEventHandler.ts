import { useSelectedMarkDown } from "../../../../store/selectedMarkdown";
import { useProjectStore } from "../../../../store/project";
import {
  createNewMarkDownFrom,
  MarkDown,
} from "../../../../store/base/markDown";

const project = useProjectStore;
const selectedMarkDown = useSelectedMarkDown;

export const handleClickMD =
  (clickedMD: MarkDown): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.preventDefault();
    project.getState().updateMarkDowns(selectedMarkDown.getState().source);
    selectedMarkDown.getState().select(clickedMD);
  };

export const handleSubmitMD =
  (submittedMD: MarkDown): React.KeyboardEventHandler<HTMLTextAreaElement> =>
  (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMD = createNewMarkDownFrom(submittedMD);
      project.getState().updateMarkDowns([submittedMD, newMD]);
      selectedMarkDown.getState().select(newMD);
    }
    console.log(project.getState().edges);
    console.log(selectedMarkDown.getState().source);
  };

export const handleChangeMDType = () => {};

export const handleChangeSelectedInput: React.ChangeEventHandler<
  HTMLTextAreaElement
> = (e) => {
  const input = e.target.value;
  selectedMarkDown.getState().setInput(input);
};
