import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("Header")}>
      <div className={cx("logo")}>Am.I</div>
      <div className={cx("userInfo")}>
        <div className={cx("name")}>DesignDefined</div>
        <div className={cx("settings")}>설정</div>
      </div>
    </header>
  );
};

export default Header;
