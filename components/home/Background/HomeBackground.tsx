import styles from "./HomeBackground.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HomeBackground = () => {
  return (
    <div
      className={cx("HomeBackground")}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div>{`Be yourself, everyone else is already taken.`}</div>
    </div>
  );
};

export default HomeBackground;
