import create from "zustand";
import { IAtom } from "../types/atom";

interface IIntersectionObserverStore {
  current: IntersectionObserver | null;
  observedAtomIds: string[];
}

let atomsToBeObserved: IAtom[] = [];

export const useIntersectionObserver = create<IIntersectionObserverStore>()(
  () => ({
    current: null,
    observedAtomIds: [],
  }),
);

const whenObserved = (id: string) => {
  useIntersectionObserver.setState((state) => ({
    observedAtomIds: [
      ...state.observedAtomIds.filter((item) => item !== id),
      id,
    ],
  }));
};
const whenUnObserved = (id: string) => {
  useIntersectionObserver.setState((state) => ({
    observedAtomIds: state.observedAtomIds.filter((item) => item !== id),
  }));
};

export const observeAtom = (ref: Element, atom: IAtom) => {
  const io = useIntersectionObserver.getState().current;
  if (io) {
    io.observe(ref);
    atomsToBeObserved = [...atomsToBeObserved, atom];
  }
};
export const resetObserver = () => {
  const io = useIntersectionObserver.getState().current;
  if (io) {
    io.disconnect();
  }
  atomsToBeObserved = [];
};

export const loadObserver = () => {
  resetObserver();
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        whenObserved(entry.target.id);
      } else {
        whenUnObserved(entry.target.id);
      }
    },
    { rootMargin: "-120px 0px" },
  );
  useIntersectionObserver.setState({ current: io });
};
