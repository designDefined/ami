import create from "zustand";

interface ICursorStore {}

export const useCursor = create<ICursorStore>()((set) => ({}));
