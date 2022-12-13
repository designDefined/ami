import { useProject } from "../../../../store/project";
import { useSelection } from "../../../../store/selection";
import { useCursor } from "../../../../store/cursor";
import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";
import {
  IAtom,
  IAtomNumberProperty,
  IAtomStringProperty,
} from "../../../../types/atom";
import {
  IPage,
  IPageNumberProperty,
  IPageStringProperty,
} from "../../../../types/page";

const projectStore = useProject;
const selectStore = useSelection;
const cursorStore = useCursor;
const weaveSidebarLayout = useWeaveSidebarLayout;

const passStringIfNumber = (input: string | number, original: number): number =>
  Number.isNaN(Number(input)) ? original : Number(input);

const updateAtom = (atom: IAtom) => {
  projectStore.getState().manipulateAtom(atom);
  selectStore.getState().selectAtom(atom);
};
const updatePage = (page: IPage) => {
  projectStore.getState().manipulatePage(page);
  selectStore.getState().selectPage(page);
};

export const changePageNumberAttribute = (
  value: number | string,
  attribute: IPageNumberProperty,
  page: IPage,
) =>
  updatePage({
    ...page,
    [attribute]: passStringIfNumber(value, page[attribute]),
  });

export const onChangePageNumberAttribute =
  (
    attribute: IPageNumberProperty,
    page: IPage,
  ): React.ChangeEventHandler<HTMLInputElement> =>
  (e) => {
    updatePage({
      ...page,
      [attribute]: passStringIfNumber(e.target.value, page[attribute]),
    });
  };

export const changePageStringAttribute = (
  value: string,
  attribute: IPageStringProperty,
  page: IPage,
) => {
  updatePage({
    ...page,
    [attribute]: value,
  });
};

export const onChangeAtomNumberAttribute =
  (
    attribute: IAtomNumberProperty,
    atom: IAtom,
  ): React.ChangeEventHandler<HTMLInputElement> =>
  (e) => {
    updateAtom({
      ...atom,
      [attribute]: passStringIfNumber(e.target.value, atom[attribute]),
    });
  };

export const onChangeAtomStringAttribute =
  (
    attribute: IAtomStringProperty,
    atom: IAtom,
  ): React.ChangeEventHandler<HTMLInputElement> =>
  (e) => {
    updateAtom({
      ...atom,
      [attribute]: e.target.value,
    });
  };
