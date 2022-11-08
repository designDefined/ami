import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";

const cx = classNames.bind(styles);
const CardLarge = () => {
  return (
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={2000}
      transitionSpeed={8000}
    >
      <div className={cx("Card", "large")}>SAMPLE: 제목이란 무엇인가</div>
    </ReactParallaxTilt>
  );
};

export default CardLarge;
