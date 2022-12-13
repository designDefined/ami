import { useProject } from "../../../../store/project";

const projectStore = useProject;
const { setPageStatus } = useProject.getState();

export const onChangeCurrentPageNumber = (to: number) => {
  if (to < projectStore.getState().pages.length && to > -2) {
    setPageStatus(to);
  } else {
    alert("유효하지 않은 페이지입니다");
  }
};

export const onChangeCurrentPageId = (to: string) => {
  if (to === "home") {
    setPageStatus(-1);
  } else {
    const idx = projectStore
      .getState()
      .pages.findIndex((page) => page.id === to);
    if (idx < 0) alert("유효하지 않은 페이지입니다");
    setPageStatus(idx);
  }
};
