import create from "zustand";
import { EdgeMarkDownType } from "./base/edgeMarkDown";

interface InputValueStatus {
  type: EdgeMarkDownType;
  currentValue: string;
  initiateValue: (
    type: EdgeMarkDownType,
    value: string,
  ) => void;
  updateValue: (value: string) => void;
  updateType: (type: EdgeMarkDownType) => void;
  resetValue: () => void;
}

const useInputValueStore = create<InputValueStatus>()(
  (set) => ({
    type: "p",
    currentValue: "",
    initiateValue: (type, value) =>
      set({ type, currentValue: value }),
    updateValue: (value) => set({ currentValue: value }),
    updateType: (type) => set({ type }),
    resetValue: () => set({ type: "p", currentValue: "" }),
  }),
);

export default useInputValueStore;
