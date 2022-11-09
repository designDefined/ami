import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Header = ({ name }: { name: string }) => {
  return <header className={cx("Header")}>{name}</header>;
};
export default Header;
