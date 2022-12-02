import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  name: string;
  children: React.ReactNode;
}

const WidgetWrapper = ({ name, children }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className={cx("WidgetWrapper")}>
      <div
        className={cx("header")}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className={cx("name")}>{name}</span>
      </div>
      <div className={cx("content", { closed: !open })}>{children}</div>
    </div>
  );
};

export default WidgetWrapper;
