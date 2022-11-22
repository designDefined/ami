import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import useModal from "../../../store/modal";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

export const Sample = () => <div>Sample Modal</div>;

const Modal = () => {
  const [easeOut, setEaseOut] = useState<boolean>(false);
  const isExist = useModal((state) => state.isExist);
  const content = useModal((state) => state.content);
  const clear = useModal((state) => state.clear);
  const config = useModal((state) => state.config);

  return (
    <div className={cx("Modal")}>
      {isExist && (
        <div
          className={cx("container", { easeIn: config.easeIn, easeOut })}
          onClick={(e) => {
            e.preventDefault();
            if (config.easeOut) {
              setTimeout(() => {
                clear();
              }, 500);
              setEaseOut(true);
            } else {
              clear();
            }
          }}
        >
          {content && content}
        </div>
      )}
    </div>
  );
};

export const modal = {
  test: (): void => {
    useModal.getState().load(<Sample />);
  },
};

export default Modal;
