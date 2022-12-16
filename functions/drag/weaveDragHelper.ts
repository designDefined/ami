import { useProject } from "../../store/project";
import { useDragGuide } from "../../store/dragGuide";
import { IAtom } from "../../types/atom";

const pageCenter = 880;
const sensitivity = 6;

const projectStore = useProject;
const dragGuideStore = useDragGuide;

interface IPosition {
  x: number;
  y: number;
}

const censor = (value: number, list: number[]) => {
  const target = list.find(
    (item) => item < value + sensitivity && item > value - sensitivity,
  );
  return target ? target : null;
};

const getAtomPositions = ({
  placedX,
  placedY,
  offsetWidth,
  offsetPadding,
  fontSize,
}: IAtom): {
  x1: number;
  x2: number;
  x3: number;
  y1: number;
  y2: number;
  y3: number;
  w: number;
  h: number;
} => ({
  x1: placedX,
  x2: placedX + offsetWidth / 2,
  x3: placedX + offsetWidth,
  y1: placedY,
  y2: placedY + offsetPadding + fontSize * 0.6 + 1,
  y3: placedY + offsetPadding * 2 + fontSize * 1.2 + 2,
  w: offsetWidth,
  h: offsetPadding * 2 + fontSize * 1.2 + 2,
});
const getTargetPositions = (): {
  lx1: number[];
  lx2: number[];
  lx3: number[];
  ly1: number[];
  ly2: number[];
  ly3: number[];
} => {
  const { pageStatus, pages } = projectStore.getState();
  const atoms = pages[pageStatus].atoms
    .filter((atom) => atom.isPlaced === "placed")
    .map((atom) => getAtomPositions(atom));
  return {
    lx1: atoms.map((atom) => atom.x1),
    lx2: atoms.map((atom) => atom.x2),
    lx3: atoms.map((atom) => atom.x3),
    ly1: atoms.map((atom) => atom.y1),
    ly2: atoms.map((atom) => atom.y2),
    ly3: atoms.map((atom) => atom.y3),
  };
};

export const magnetAtom = (
  to: { x: number; y: number },
  target: IAtom,
): IPosition => {
  const { x1, x2, x3, y1, y2, y3, w, h } = getAtomPositions({
    ...target,
    placedX: to.x,
    placedY: to.y,
  });
  const result = { x: to.x, y: to.y };
  const { lx1, lx2, lx3, ly1, ly2, ly3 } = getTargetPositions();

  const [cx1, cx2, cx3, cy1, cy2, cy3] = [
    censor(x1, lx1),
    censor(x2, [pageCenter, ...lx2]),
    censor(x3, lx3),
    censor(y1, ly1),
    censor(y2, ly2),
    censor(y3, ly3),
  ];
  if (cx2) {
    dragGuideStore.getState().setVerticalGuide(cx2);
    result.x = cx2 - w / 2;
  } else if (cx1) {
    dragGuideStore.getState().setVerticalGuide(cx1);
    result.x = cx1;
  } else if (cx3) {
    dragGuideStore.getState().setVerticalGuide(cx3);
    result.x = cx3 - w;
  } else {
    dragGuideStore.getState().setVerticalGuide(null);
  }
  if (cy1) {
    dragGuideStore.getState().setHorizontalGuide(cy1);
    result.y = cy1;
  } else if (cy2) {
    dragGuideStore.getState().setHorizontalGuide(cy2);
    result.y = cy2 - h / 2;
  } else if (cy3) {
    dragGuideStore.getState().setHorizontalGuide(cy3);
    result.y = cy3 - h;
  } else {
    dragGuideStore.getState().setHorizontalGuide(null);
  }
  return result;
};
