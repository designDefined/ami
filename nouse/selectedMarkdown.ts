import create from "zustand";
import { MarkDown } from "./base/markDown";

interface SelectedMarkDownStatus {
  source: MarkDown[];
  input: string;
  select: (markDown: MarkDown) => void;
  deSelect: () => void;
  setInput: (input: string) => void;
}

export const useSelectedMarkDown = create<SelectedMarkDownStatus>()((set) => ({
  source: [],
  input: "",
  select: (markDown) => set({ source: [markDown], input: markDown.innerText }),
  deSelect: () => set({ source: [] }),
  setInput: (input) => set({ input }),
}));
