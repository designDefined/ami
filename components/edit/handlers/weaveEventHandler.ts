import { useProject } from "../../../store/project";
import { toast } from "react-toastify";
import { useSelection } from "../../../store/selection";
import { useCursor } from "../../../store/cursor";
import { IAtom, IPage } from "../../../types/base";
import { useWeaveSidebarLayout } from "../../../store/layout/weaveSidebar";
import { magnetAtom } from "../../../functions/drag/weaveDragHelper";
import { IAtomInteraction } from "../../../types/interaction";
import { ChangeEventHandler } from "react";
import createEmpty from "../../../functions/create/createEmpty";

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
type IPageModifiableNumberAttribute = "offsetHeight";
type IPageModifiableStringAttribute = "pageName" | "backgroundColor";
export const updatePageInfo = (page: IPage) => {
  projectStore.getState().manipulatePage(page);
};
export const onChangePageNumberAttribute =
  (
    attribute: IPageModifiableNumberAttribute,
    page: IPage,
  ): React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > =>
  (e) =>
    updatePageInfo({
      ...page,
      [attribute]: passStringIfNumber(e.target.value, page[attribute]),
    });

export const onChangePageStringAttribute =
  (
    attribute: IPageModifiableStringAttribute,
    page: IPage,
  ): React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > =>
  (e) =>
    updatePageInfo({
      ...page,
      [attribute]: e.target.value,
    });

export const onConnectPage =
  (
    from: IPage,
    to: IPage,
    isConnect: boolean = true,
  ): React.MouseEventHandler<HTMLSpanElement> =>
  (e) => {
    e.preventDefault();
    if (isConnect) {
      projectStore.getState().manipulatePage([
        { ...from, connectedTo: [...from.connectedTo, to.id] },
        { ...to, connectedTo: [...to.connectedTo, from.id] },
      ]);
      selectStore
        .getState()
        .selectPage({ ...from, connectedTo: [...from.connectedTo, to.id] });
    } else {
      projectStore.getState().manipulatePage([
        {
          ...from,
          connectedTo: from.connectedTo.filter(
            (connection) => connection !== to.id,
          ),
        },
        {
          ...to,
          connectedTo: to.connectedTo.filter(
            (connection) => connection !== from.id,
          ),
        },
      ]);
      selectStore.getState().selectPage({
        ...from,
        connectedTo: from.connectedTo.filter(
          (connection) => connection !== to.id,
        ),
      });
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
const addInteraction = (
  input: IAtomInteraction,
  interactions: IAtomInteraction[],
  multiple: boolean,
) =>
  multiple
    ? [...interactions, input]
    : [
        ...interactions.filter(
          (interaction) =>
            interaction.interactionType !== input.interactionType,
        ),
        input,
      ];
const deleteInteraction = (
  input: IAtomInteraction,
  interactions: IAtomInteraction[],
  strict: boolean,
) =>
  strict
    ? interactions.filter((interaction) => interaction !== input)
    : interactions.filter(
        (interaction) => interaction.interactionType !== input.interactionType,
      );

export const onAddScroll =
  (atom: IAtom): React.MouseEventHandler<HTMLButtonElement> =>
  () => {
    updateAtomInfo({
      ...atom,
      interactions: addInteraction(
        {
          interactionType: "scroll",
          value: "fadeIO",
        },
        atom.interactions,
        false,
      ),
    });
  };
export const onDeleteScroll =
  (atom: IAtom): React.MouseEventHandler<HTMLButtonElement> =>
  () => {
    updateAtomInfo({
      ...atom,
      interactions: deleteInteraction(
        {
          interactionType: "scroll",
          value: "fadeIO",
        },
        atom.interactions,
        false,
      ),
    });
  };

export const getClickInteraction = (
  interactions: IAtomInteraction[],
): { interactionType: "click"; to: string; external: boolean } | false => {
  const target = interactions.find((item) => item.interactionType === "click");
  if (target && target.interactionType === "click" && target.external) {
    return target;
  } else {
    return false;
  }
};

export const getClickInteractionValue = (
  interactions: IAtomInteraction[],
): string => {
  const target = interactions.find((item) => item.interactionType === "click");
  if (target && target.interactionType === "click") {
    if (target.external) {
      return "external";
    } else {
      return target.to;
    }
  } else {
    return "clear";
  }
};

export const onChangeClickInteraction = (
  atom: IAtom,
  isPath: boolean,
): React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> =>
  isPath
    ? (e) => {
        updateAtomInfo({
          ...atom,
          interactions: addInteraction(
            {
              interactionType: "click",
              to: e.target.value,
              external: true,
            },
            atom.interactions,
            false,
          ),
        });
      }
    : (e) => {
        const input: IAtomInteraction = {
          interactionType: "click",
          to: e.target.value,
          external: false,
        };
        if (e.target.value === "clear") {
          updateAtomInfo({
            ...atom,
            interactions: deleteInteraction(input, atom.interactions, false),
          });
        } else if (e.target.value === "external") {
          updateAtomInfo({
            ...atom,
            interactions: addInteraction(
              { ...input, external: true },
              atom.interactions,
              false,
            ),
          });
        } else {
          updateAtomInfo({
            ...atom,
            interactions: addInteraction(input, atom.interactions, false),
          });
        }
      };

export const onAddImageAtom =
  (parentId: string): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    projectStore.getState().manipulateAtom(createEmpty.imageAtom(parentId));
  };

/******************** Drag Atom ********************/
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
          { initX: clientX - 30, initY: clientY - 20 },
          {
            diffX: 30,
            diffY: 20,
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

export const onPressPlacedPage =
  (page: IPage): React.MouseEventHandler<HTMLDivElement> =>
  (e) => {
    e.preventDefault();
    if (weaveSidebarLayout.getState().status === "open") {
      weaveSidebarLayout.getState().setStatus("temporal");
    }
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
