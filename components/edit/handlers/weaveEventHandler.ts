import { useProject } from "../../../store/project";
import { toast } from "react-toastify";
import { useSelection } from "../../../store/selection";
import { useCursor } from "../../../store/cursor";
import { IAtom } from "../../../types/base";
import { useWeaveSidebarLayout } from "../../../store/layout/weaveSidebar";
import { magnetAtom } from "../../../functions/drag/weaveDragHelper";

/******************** Stores ********************/

const projectStore = useProject;
const selectStore = useSelection;
const cursorStore = useCursor;
const weaveSidebarLayout = useWeaveSidebarLayout;

/******************** Common ********************/
const isDragging = () => cursorStore.getState().status === "drag";
const consoleCursor = () => console.log(cursorStore.getState());

const passStringIfNumber = (input: string, original: number): number =>
  Number.isNaN(Number(input)) ? original : Number(input);

/******************** Page ********************/
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

/******************** Atom ********************/
type IAtomModifiableNumberAttribute =
  | "offsetWidth"
  | "offsetPadding"
  | "fontSize"
  | "fontWeight"
  | "borderWidth"
  | "borderRadius"
  | "placedX"
  | "placedY"
  | "layer";
type IAtomModifiableStringAttribute =
  | "content"
  | "fontFamily"
  | "fontColor"
  | "textAlign"
  | "backgroundColor"
  | "borderColor";

export const updateAtomInfo = (atom: IAtom) => {
  projectStore.getState().manipulateAtom(atom);
  selectStore.getState().selectAtom(atom);
};

export const onChangeAtomStringAttribute =
  (
    attribute: IAtomModifiableStringAttribute,
    atom: IAtom,
  ): React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > =>
  (e) =>
    updateAtomInfo({ ...atom, [attribute]: e.target.value });

export const onChangeAtomNumberAttribute =
  (
    attribute: IAtomModifiableNumberAttribute,
    atom: IAtom,
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
  (e) =>
    updateAtomInfo({
      ...atom,
      [attribute]: passStringIfNumber(e.target.value, atom[attribute]),
    });

/******************** Drag ********************/
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
      projectStore
        .getState()
        .manipulateAtom({ ...atom, isPlaced: "nowPlacing" });
      cursorStore.getState().startDragAtom(
        atom,
        { initX: clientX - offsetX - 1, initY: clientY - offsetY - 1 },
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
    const { current, xDiff, yDiff } = cursorStore.getState();
    if (current.type === "atom") {
      const { x, y } = magnetAtom(
        { x: e.clientX - xDiff, y: e.clientY - yDiff },
        current.data,
      );
      cursorStore.getState().updateCursor(x, y);
    }
  }
};

export const onReleaseAtom =
  (): React.MouseEventHandler<HTMLDivElement> => (e) => {
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
      cursorStore.getState().releaseDrag();
    } else {
      //selectStore.getState().deselect();
    }
  };
