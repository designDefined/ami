import { IAtom } from "../../../types/base";
import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { submitAtom } from "../handlers/WeaveEventHandler";
const cx = classNames.bind(styles);

const AtomForm = ({ atom }: { atom: IAtom }) => {
  const [width, setWidth] = useState<number>(atom.style.geometry.width);

  return (
    <form
      className={cx("atomForm")}
      onSubmit={(e) => {
        e.preventDefault();
        submitAtom({
          ...atom,
          style: {
            ...atom.style,
            geometry: { ...atom.style.geometry, width: width },
          },
        });
      }}
    >
      넓이:{" "}
      <input
        type="text"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
      />
    </form>
  );
};
export default AtomForm;
