import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";
import { IAtom } from "../../../../types/atom";
import { useSelection } from "../../../../store/selection";
import { useCursor } from "../../../../store/cursor";
import { useProject } from "../../../../store/project";
import { IPage } from "../../../../types/page";
import { initializeTextAtom } from "./createNew";
import { magnetAtom } from "../../../../functions/drag/weaveDragHelper";

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

export const onPressListedPage =
  (page: IPage): React.MouseEventHandler<HTMLLIElement> =>
  (e) => {
    e.preventDefault();
    if (!isDragging()) {
      if (page.isPlaced === "notPlaced") {
        selectStore.getState().selectPage(page);
        const { clientX, clientY } = e;
        if (weaveSidebarLayout.getState().status === "open") {
          weaveSidebarLayout.getState().setStatus("temporal");
        }
        projectStore
          .getState()
          .manipulatePage({ ...page, isPlaced: "nowPlacing" });
        cursorStore.getState().startDragPage(
          page,
          { initX: clientX - 10, initY: clientY - 10 },
          {
            diffX: 10,
            diffY: 10,
          },
        );
      }
    }
  };

export const onDrag = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
  e.preventDefault();

  if (isDragging()) {
    const { current, xDiff, yDiff } = cursorStore.getState();
    if (current.type === "atom") {
      const { x, y } = magnetAtom(
        { x: e.nativeEvent.offsetX - xDiff, y: e.nativeEvent.offsetY - yDiff },
        current.data,
      );
      cursorStore.getState().updateCursor(x, y);
    }
    if (current.type === "page") {
      cursorStore.getState().updateCursor(e.clientX - xDiff, e.clientY - yDiff);
    }
  }
};

export const onRelease = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
  e.preventDefault();
  if (weaveSidebarLayout.getState().status === "temporal") {
    weaveSidebarLayout.getState().setStatus("open");
  }
  if (isDragging()) {
    const { current, x, y } = cursorStore.getState();
    const { type, data } = current;
    if (type === "atom") {
      const newAtom: IAtom = {
        ...data,
        isPlaced: "placed",
        placedX: x,
        placedY: y,
      };
      projectStore.getState().manipulateAtom(newAtom);
      selectStore.getState().selectAtom(newAtom);
    }
    if (type === "page") {
      const newPage: IPage = {
        ...data,
        isPlaced: "placed",
        placedX: x,
        placedY: y,
      };
      projectStore.getState().manipulatePage(newPage);
      selectStore.getState().selectPage(newPage);
    }
    cursorStore.getState().releaseDrag();
  } else {
    //selectStore.getState().deselect();
  }
};
