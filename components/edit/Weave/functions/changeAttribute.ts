import { useProject } from "../../../../store/project";
import { useSelection } from "../../../../store/selection";
import {
  IAtom,
  IAtomNumberProperty,
  IAtomStringProperty,
  ITextAtom,
  ITextAtomNumberProperty,
  ITextAtomStringProperty,
} from "../../../../types/atom";
import {
  IPage,
  IPageNumberProperty,
  IPageStringProperty,
} from "../../../../types/page";
import { IAtomExtension } from "../../../../types/atomExtension";

const projectStore = useProject;
const selectStore = useSelection;

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

/****** Page ******/

export const changePageNumberAttribute = (
  value: number | string,
  attribute: IPageNumberProperty,
  page: IPage,
) =>
  updatePage({
    ...page,
    [attribute]: passStringIfNumber(value, page[attribute]),
  });

export const changePageStringAttribute = (
  value: string,
  attribute: IPageStringProperty,
  page: IPage,
) =>
  updatePage({
    ...page,
    [attribute]: value,
  });

/****** Atom ******/

export const changeAtomNumberAttribute = (
  value: number | string,
  attribute: IAtomNumberProperty,
  atom: IAtom,
) =>
  updateAtom({
    ...atom,
    [attribute]: passStringIfNumber(value, atom[attribute]),
  });

export const changeAtomStringAttribute = (
  value: string,
  attribute: IAtomStringProperty,
  atom: IAtom,
) =>
  updateAtom({
    ...atom,
    [attribute]: value,
  });

export const changeTextAtomNumberAttribute = (
  value: number | string,
  attribute: ITextAtomNumberProperty,
  atom: ITextAtom,
) =>
  updateAtom({
    ...atom,
    [attribute]: passStringIfNumber(value, atom[attribute]),
  });

export const changeTextAtomStringAttribute = (
  value: string,
  attribute: ITextAtomStringProperty,
  atom: ITextAtom,
) =>
  updateAtom({
    ...atom,
    [attribute]: value,
  });

/****** Atom Extension ******/

export const changeAtomExtension = (
  value: IAtomExtension,
  atom: IAtom,
  isSingle: boolean,
) => {
  if (atom.extension.includes(value)) {
    updateAtom({
      ...atom,
      extension: atom.extension.filter((ext) => ext !== value),
    });
  } else {
    updateAtom({
      ...atom,
      extension: isSingle
        ? [
            ...atom.extension.filter(
              (ext) => ext.extensionType !== value.extensionType,
            ),
            value,
          ]
        : [...atom.extension, value],
    });
  }
};
export const clearLink = (atom: IAtom, isInternal: boolean) => {
  updateAtom({
    ...atom,
    extension: atom.extension.filter(
      (ext) =>
        ext.extensionType !== (isInternal ? "internalLink" : "externalLink"),
    ),
  });
};
