import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";
import { IAtom } from "../../../../types/atom";
import { useSelection } from "../../../../store/selection";
import { useCursor } from "../../../../store/cursor";
import { useProject } from "../../../../store/project";
import { IPage } from "../../../../types/page";
import { initializeTextAtom } from "./initializeAtom";

const projectStore = useProject;
const cursorStore = useCursor;
const selectStore = useSelection;
const weaveSidebarLayout = useWeaveSidebarLayout;

const isDragging = (): boolean => cursorStore.getState().status === "drag";

export const onPressPlacedAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.preventDefault();
    if (weaveSidebarLayout.getState().status === "open") {
      weaveSidebarLayout.getState().setStatus("temporal");
    }
    if (!isDragging()) {
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

export const onPressPlacedPageSymbol =
  (page: IPage): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.preventDefault();
    if (!isDragging()) {
      selectStore.getState().selectPage(page);
      const { clientX, clientY, nativeEvent } = e;
      const { offsetX, offsetY } = nativeEvent;
      projectStore
        .getState()
        .manipulatePage({ ...page, isPlaced: "nowPlacing" });
      cursorStore.getState().startDragPage(
        page,
        { initX: clientX - offsetX - 1, initY: clientY - offsetY - 1 },
        {
          diffX: offsetX + 1,
          diffY: offsetY + 1,
        },
      );
    }
  };

export const onPressListedAtom =
  (atom: IAtom): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.preventDefault();
    if (!isDragging()) {
      if (atom.isPlaced === "notPlaced") {
        selectStore.getState().selectAtom(atom);
        const { clientX, clientY } = e;
        if (weaveSidebarLayout.getState().status === "open") {
          weaveSidebarLayout.getState().setStatus("temporal");
        }
        projectStore
          .getState()
          .manipulateAtom({ ...atom, isPlaced: "nowPlacing" });
        cursorStore.getState().startDragAtom(
          atom.type === "text" ? initializeTextAtom(atom) : atom,
          { initX: clientX - atom.offsetWidth / 2, initY: clientY - 10 },
          {
            diffX: atom.offsetWidth / 2,
            diffY: 10,
          },
        );
      }
    }
  };

export const onPressListedPage = () => {};
