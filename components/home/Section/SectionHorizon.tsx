import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";

const cx = classNames.bind(styles);

const SectionHorizon = () => {
  return (
    <section className={cx("Horizon")}>
      <div className={cx("label")}>Some Projects</div>
      <div className={cx("cards")}>
        <CardSmall /> <CardSmall /> <CardSmall /> <CardSmall />
        <CardSmall />
      </div>
    </section>
  );
};
export default SectionHorizon;
