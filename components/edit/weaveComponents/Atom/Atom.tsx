import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { onPressPlacedAtom } from "../../handlers/weaveEventHandler";
import { CSSProperties, useMemo } from "react";
import createStyle from "../../../../functions/create/createStyle";
import imageSample, {
  imageSampleList,
} from "../../../../public/assets/images/images";
import Image from "next/image";

interface Props {
  atom: IAtom;
  isSelected: boolean;
}
const cx = classNames.bind(styles);

const Atom = ({ atom, isSelected }: Props) => {
  const { type, content, offsetWidth } = atom;
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom),
    [atom],
  );
  if (type === "image") {
    const source = content as typeof imageSampleList[number];
    return (
      <div
        className={cx("Atom", { isSelected })}
        style={atomStyle}
        onMouseDown={onPressPlacedAtom(atom)}
      >
        {<Image src={imageSample[source]} alt={content} width={offsetWidth} />}
      </div>
    );
  }

  return (
    <div
      className={cx("Atom", { isSelected })}
      style={atomStyle}
      onMouseDown={onPressPlacedAtom(atom)}
    >
      {content}
    </div>
  );
};
export default Atom;
