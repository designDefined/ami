import create from "zustand";

type IWeaveSidebarStatus = "open" | "close" | "temporal";

interface IWeaveSidebarLayout {
  status: IWeaveSidebarStatus;
  setStatus: (status: IWeaveSidebarStatus) => void;
}

export const useWeaveSidebarLayout = create<IWeaveSidebarLayout>()((set) => ({
  status: "open",
  setStatus: (status) => set({ status }),
}));
