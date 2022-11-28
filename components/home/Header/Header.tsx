import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useEffect } from "react";
import { postLogin, useUserStore } from "../../../nouse/store/api/user";

const cx = classNames.bind(styles);

const Header = () => {
  const status = useUserStore((state) => state.status);
  const user = useUserStore((state) => state.response);
  useEffect(() => {
    postLogin();
  }, []);

  return (
    <header className={cx("Header")}>
      <div className={cx("logo")}>Am.I</div>
      <div className={cx("userInfo")}>
        {status === "no_user" && (
          <button
            onClick={() => {
              postLogin();
            }}
          >
            로그인
          </button>
        )}
        {status === "pending" && <div>로그인 중</div>}
        {status === "logged_in" && (
          <div className={cx("name")}>{user.user_name}</div>
        )}
        <div className={cx("settings")}>설정</div>
      </div>
    </header>
  );
};

export default Header;
