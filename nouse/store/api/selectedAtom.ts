import create from "zustand";
import { IAtom } from "../../../types/old/base";

interface SelectedAtomStatus {
  source: IAtom[];
  input: string;
  select: (atom: IAtom) => void;
  deselect: () => void;
  setInput: (input: string) => void;
}

export const useSelectedAtomStore = create<SelectedAtomStatus>()((set) => ({
  source: [],
  input: "",
  select: (atom) => set({ source: [atom], input: atom.content }),
  deselect: () => set({ source: [] }),
  setInput: (input) => set({ input }),
}));
