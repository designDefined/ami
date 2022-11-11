import { useProjectStore } from "../../../store/api/project";
import { IPage } from "../../../types/base";

const project = useProjectStore;

export const submitPage = (page: IPage) => {
  project.getState().updatePage(page);
};
