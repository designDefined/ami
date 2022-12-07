import { useProject } from "../../../store/project";
import { toast } from "react-toastify";
import { useSelection } from "../../../store/selection";
import { useCursor } from "../../../store/cursor";
import { IAtom } from "../../../types/base";
import { useWeaveSidebarLayout } from "../../../store/layout/weaveSidebar";

const projectStore = useProject;
const selectStore = useSelection;
const cursorStore = useCursor;
const weaveSidebarLayout = useWeaveSidebarLayout;

const isDragging = () => cursorStore.getState().status === "drag";
//const consoleCursor = () => console.log(cursorStore.getState());

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

export const onPressListedAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.preventDefault();

    if (!isDragging()) {
      selectStore.getState().selectAtom(atom);
      if (atom.isPlaced === "notPlaced") {
        const { clientX, clientY } = e;
        if (weaveSidebarLayout.getState().status === "open") {
          weaveSidebarLayout.getState().setStatus("temporal");
        }
        projectStore
          .getState()
          .manipulateAtom({ ...atom, isPlaced: "nowPlacing" });
        cursorStore.getState().startDragAtom(
          atom,
          { initX: clientX - atom.offsetWidth / 2, initY: clientY - 10 },
          {
            diffX: atom.offsetWidth / 2,
            diffY: 10,
          },
        );
      }
    }
  };

export const onPressPlacedAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.preventDefault();
    if (weaveSidebarLayout.getState().status === "open") {
      weaveSidebarLayout.getState().setStatus("temporal");
    }
    if (!isDragging()) {
      selectStore.getState().selectAtom(atom);
      const { clientX, clientY, nativeEvent } = e;
      const { offsetX, offsetY } = nativeEvent;
      console.log(clientX);
      console.log(offsetX);
      projectStore
        .getState()
        .manipulateAtom({ ...atom, isPlaced: "nowPlacing" });
      cursorStore.getState().startDragAtom(
        atom,
        { initX: clientX - offsetX, initY: clientY - offsetY },
        {
          diffX: offsetX + 1,
          diffY: offsetY + 1,
        },
      );
    }
  };

export const onDrag = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
  e.preventDefault();
  if (isDragging()) {
    const { xDiff, yDiff } = cursorStore.getState();
    cursorStore.getState().updateCursor(e.clientX - xDiff, e.clientY - yDiff);
  }
};

export const onReleaseAtom =
  (): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.preventDefault();
    if (weaveSidebarLayout.getState().status === "temporal") {
      weaveSidebarLayout.getState().setStatus("open");
    }
    if (isDragging()) {
      const { clientX, clientY } = e;
      const { xDiff, yDiff, current } = cursorStore.getState();
      const { type, data } = current;
      if (type === "atom") {
        projectStore.getState().manipulateAtom({
          ...data,
          isPlaced: "placed",
          placedX: clientX - xDiff,
          placedY: clientY - yDiff,
        });
      }
      cursorStore.getState().releaseDrag();
    } else {
      selectStore.getState().deselect();
    }
  };
