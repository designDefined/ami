import create from "zustand";

interface IModalConfig {
  easeIn: boolean;
  easeOut: boolean;
}

const defaultConfig: IModalConfig = {
  easeIn: true,
  easeOut: true,
};

interface IModalStore {
  config: IModalConfig;
  isExist: boolean;
  content: React.ReactNode | null;
  clear: () => void;
  load: (content: React.ReactNode) => void;
  setConfig: (config: Partial<IModalConfig>) => void;
}

const useModal = create<IModalStore>()((set) => ({
  config: defaultConfig,
  isExist: false,
  content: null,
  clear: () => set({ isExist: false, content: null }),
  load: (content) => set({ isExist: true, content }),
  setConfig: (config) =>
    set((state) => ({ config: { ...state.config, ...config } })),
}));

export default useModal;
