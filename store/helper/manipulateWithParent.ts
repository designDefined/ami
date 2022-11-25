import { IAtom, IPage } from "../../types/base";

export const findAtomParent = (
  pages: IPage[],
  atom: IAtom | IAtom[],
): IPage | false => {
  if (Array.isArray(atom) && atom.length < 1) {
    return false;
  }
  const parentPageId = Array.isArray(atom)
    ? atom[0].parentPageId
    : atom.parentPageId;
  const parentPage = pages.find((page) => page.id === parentPageId);
  return parentPage ? parentPage : false;
};

export const findAtomRelatively = (
  pages: IPage[],
  atom: IAtom,
  relativeIndex: number,
): IAtom | false => {
  const parent = findAtomParent(pages, atom);
  if (parent) {
    const { atoms } = parent;
    const index = atoms.findIndex((item) => item.id === atom.id);
    const result = atoms[index + relativeIndex];
    return result ? result : false;
  }
  return false;
};
