import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Header = ({ title }: { title: string }) => {
  return <header className={cx("Header")}>{title}</header>;
};
export default Header;
