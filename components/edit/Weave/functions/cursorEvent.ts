import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";
import { IAtom } from "../../../../types/atom";
import { useSelection } from "../../../../store/selection";
import { useCursor } from "../../../../store/cursor";
import { useProject } from "../../../../store/project";

const projectStore = useProject;
const cursorStore = useCursor;
const selectStore = useSelection;
const weaveSidebarLayout = useWeaveSidebarLayout;

export const onPressPlacedAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.preventDefault();
    if (weaveSidebarLayout.getState().status === "open") {
      weaveSidebarLayout.getState().setStatus("temporal");
    }
    if (cursorStore.getState().status !== "drag") {
      selectStore.getState().selectAtom(atom);
      const { placedX, placedY } = atom;
      const { nativeEvent } = e;
      const { offsetX, offsetY } = nativeEvent;
      projectStore
        .getState()
        .manipulateAtom({ ...atom, isPlaced: "nowPlacing" });
      cursorStore.getState().startDragAtom(
        atom,
        { initX: placedX, initY: placedY },
        {
          diffX: offsetX + 1,
          diffY: offsetY + 1,
        },
      );
    }
  };

export const onDoubleClickAtom = () => () => {
  console.log("clickDouble!");
};
