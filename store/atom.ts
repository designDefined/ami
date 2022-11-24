import create from "zustand";
import { IAtom, ILoadable, INullable } from "../types/base";
import codes from "../types/codes";

type IAtomEdit = Pick<
  IAtom,
  "id" | "type" | "markdownType" | "markdownDepth" | "content" | "parentPageId"
>;

interface IAtomStore extends IAtomEdit, INullable {
  load: (atom: IAtom) => void;
  clear: () => void;
  setContent: (content: string) => void;
}

const noAtom: IAtomEdit = {
  id: codes.noAtom,
  type: "text",
  markdownType: "p",
  markdownDepth: -1,
  content: "",
  parentPageId: codes.noPage,
};

export const useAtom = create<IAtomStore>()((set) => ({
  ...noAtom,
  isNull: true,
  load: ({ id, type, markdownType, markdownDepth, content }) =>
    set({ id, type, markdownType, markdownDepth, content, isNull: false }),
  clear: () => set({ ...noAtom, isNull: true }),
  setContent: (content) => set({ content }),
}));
