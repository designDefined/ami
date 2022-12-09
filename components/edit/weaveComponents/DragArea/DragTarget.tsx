import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";
import { IAtom, IPage } from "../../../../types/base";
import { CSSProperties, useMemo } from "react";
import createStyle from "../../../../functions/create/createStyle";
import imageSample, {
  imageSampleList,
} from "../../../../public/assets/images/images";
import { onPressPlacedAtom } from "../../handlers/weaveEventHandler";
import Image from "next/image";

const cx = classNames.bind(styles);

interface TextAtomProps {
  x: number;
  y: number;
  atom: IAtom;
}
interface PageSymbolProps {
  x: number;
  y: number;
  page: IPage;
}

export const TextAtomDragTarget = ({ x, y, atom }: TextAtomProps) => {
  const { type, content, offsetWidth } = atom;
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom, { is: true, x, y }),
    [atom, x, y],
  );
  if (type === "image") {
    const source = content as typeof imageSampleList[number];
    return (
      <div className={cx("Atom")} style={atomStyle}>
        {
          <Image
            src={imageSample[source]}
            alt={content}
            width={offsetWidth}
            style={{ opacity: 0.5 }}
          />
        }
      </div>
    );
  }
  return (
    <div className={cx("DragTarget", "textAtom")} style={atomStyle}>
      {content}
    </div>
  );
};

export const PageSymbolDragTarget = ({ x, y, page }: PageSymbolProps) => {
  const { pageName } = page;
  const pageSymbolStyle = useMemo(
    (): CSSProperties => createStyle.pageSymbol(page, { is: true, x, y }),
    [page, x, y],
  );
  return (
    <div className={cx("DragTarget", "pageSymbol")} style={pageSymbolStyle}>
      {pageName}
    </div>
  );
};
