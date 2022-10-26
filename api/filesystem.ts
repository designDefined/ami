import { useProjectStore } from "../store/project";
import { createCleanEdgeWith } from "../store/base/edge";
import { nanoid } from "nanoid";
import { createDefaultMarkDownAt } from "../store/base/markDown";
import { useSelectedMarkDown } from "../store/selectedMarkdown";

const titleLocation = "title";
const edgesLocation = "edges";

export const saveEdges = () => {
  const title = useProjectStore.getState().title;
  const edges = useProjectStore.getState().edges;
  localStorage.setItem(titleLocation, title);
  localStorage.setItem(edgesLocation, JSON.stringify(edges));
};

export const loadProject = () => {
  const title = localStorage.getItem(titleLocation);
  const data = localStorage.getItem(edgesLocation);
  if (title) {
    useProjectStore.getState().setProjectTitle(title);
  } else {
    useProjectStore.getState().setProjectTitle("untitled_project");
  }
  if (data) {
    useProjectStore.getState().setEdges(JSON.parse(data));
  } else {
    const id = nanoid(10);
    const firstMd = createDefaultMarkDownAt(id);
    useProjectStore.getState().setEdges([createCleanEdgeWith(id, firstMd)]);
    useSelectedMarkDown.getState().select(firstMd);
  }
};

export const resetProject = () => {
  localStorage.removeItem(titleLocation);
  localStorage.removeItem(edgesLocation);
  loadProject();
};
