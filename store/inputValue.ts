import create from "zustand";
import { EdgeMarkDownType } from "./base/markDown";

interface InputValueStatus {
  type: EdgeMarkDownType;
  sourceId: string;
  currentValue: string;
  initiateValue: (type: EdgeMarkDownType, value: string) => void;
  updateValue: (value: string) => void;
  updateType: (type: EdgeMarkDownType) => void;
  resetValue: () => void;
}

const useInputValueStore = create<InputValueStatus>()((set) => ({
  type: "p",
  sourceId: "",
  currentValue: "",
  initiateValue: (type, value) => set({ type, currentValue: value }),
  updateValue: (value) => set({ currentValue: value }),
  updateType: (type) => set({ type }),
  resetValue: () => set({ type: "p", currentValue: "" }),
}));

export default useInputValueStore;
