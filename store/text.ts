import create from "zustand";
import { IAtom, IIdentifier } from "../types/old/base";

interface ITextStore {
  identifier: IIdentifier | null;
  input: string;
  clear: () => void;
  setIdentifier: (id: IIdentifier) => void;
  setInput: (input: string) => void;
}

export const useText = create<ITextStore>()((set) => ({
  identifier: null,
  input: "",
  clear: () => set({ identifier: "", input: "" }),
  setIdentifier: (id) => set({ identifier: id }),
  setInput: (input) => set({ input }),
}));
