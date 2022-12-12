import { useProjectStore } from "../store/api/project";
import { IAtom, IPage } from "../../types/old/base";

const project = useProjectStore;

export const submitPage = (page: IPage) => {
  project.getState().updatePage(page);
};

export const submitAtom = (atom: IAtom) => {
  project.getState().updateAtoms([atom]);
};
