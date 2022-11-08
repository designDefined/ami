import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";

const cx = classNames.bind(styles);
const CardSmall = () => {
  return (
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={500}
      transitionSpeed={2000}
    >
      <div className={cx("Card", "small")}>sample</div>
    </ReactParallaxTilt>
  );
};

export default CardSmall;
