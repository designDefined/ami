import CardLarge from "../Card/CardLarge";
import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";
import ReactParallaxTilt from "react-parallax-tilt";

const cx = classNames.bind(styles);

const SectionBillboard = () => {
  return (
    <section className={cx("Billboard")}>
      <div className={cx("main")}>
        <CardLarge />
      </div>
      <div className={cx("sub")}>
        <CardSmall />
        <CardSmall />
        <CardSmall />
      </div>
    </section>
  );
};
export default SectionBillboard;
