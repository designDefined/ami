import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { IProjectSummary } from "../../../types/base";
import { useRouter } from "next/router";

interface Props {
  label: string;
  callback: React.MouseEventHandler<HTMLButtonElement>;
}

const cx = classNames.bind(styles);
const CardSmallButton = ({ label, callback }: Props) => (
  <ReactParallaxTilt
    tiltReverse
    glareEnable={false}
    perspective={500}
    transitionSpeed={2000}
  >
    <button className={cx("add")} onClick={callback}>
      {label}
    </button>
  </ReactParallaxTilt>
);

export default CardSmallButton;
