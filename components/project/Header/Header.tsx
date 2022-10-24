import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";
const cx = classNames.bind(styles);

const Header = memo(({ title }: { title: string }) => {
  return <header className={cx("Header")}>{title}</header>;
});
export default Header;
