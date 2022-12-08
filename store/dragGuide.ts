import create from "zustand";

interface IDragGuideStore {
  guideVertical: number | null;
  guideHorizontal: number | null;
  setVerticalGuide: (position: number | null) => void;
  setHorizontalGuide: (position: number | null) => void;
}

export const useDragGuide = create<IDragGuideStore>()((set) => ({
  guideVertical: null,
  guideHorizontal: null,
  setVerticalGuide: (position) => set({ guideVertical: position }),
  setHorizontalGuide: (position) => set({ guideHorizontal: position }),
}));
