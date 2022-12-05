import { useProject } from "../../../store/project";
import { toast } from "react-toastify";
import { useSelection } from "../../../store/selection";
import { useCursor } from "../../../store/cursor";
import { IAtom } from "../../../types/base";

const projectStore = useProject;
const selectStore = useSelection;
const cursorStore = useCursor;

type empty = (e: null) => void;

const isDragging = () => cursorStore.getState().status === "drag";
const consoleCursor = () => console.log(cursorStore.getState());

export const onChangePage =
  (input: number, length: number): React.FormEventHandler<HTMLFormElement> =>
  (e) => {
    if (e) {
      e.preventDefault();
    }
    if (input >= 0 && input <= length) {
      projectStore.getState().setPageStatus(input - 1);
    } else {
      toast.error("wrong page number");
    }
  };

export const onPressAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.preventDefault();
    console.log(e.screenY);
    if (!isDragging()) {
      const { screenX, screenY, nativeEvent } = e;
      const { offsetX, offsetY } = nativeEvent;
      selectStore.getState().selectAtom(atom);
      cursorStore.getState().startDragAtom(
        atom,
        { initX: screenX - 50, initY: screenY - 130 },
        {
          diffX: 50,
          diffY: 130,
        },
      );
    }
  };

export const onDrag = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
  e.preventDefault();
  if (isDragging()) {
    const { xDiff, yDiff } = cursorStore.getState();
    cursorStore.getState().updateCursor(e.screenX - xDiff, e.screenY - yDiff);
  }
};

export const onReleaseAtom =
  (): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.preventDefault();
    if (isDragging()) {
      cursorStore.getState().releaseDrag();
    }
  };
