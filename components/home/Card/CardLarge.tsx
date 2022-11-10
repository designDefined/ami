import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { useRouter } from "next/router";
import { IProjectSum } from "../../../types/base";

interface Props {
  project: IProjectSum;
}

const cx = classNames.bind(styles);

const CardLarge = ({ project }: Props) => {
  const { project_name, id } = project;

  const router = useRouter();
  return (
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={2000}
      transitionSpeed={8000}
    >
      <div
        className={cx("Card", "large")}
        onClick={() => {
          router.push(`/edit/${id}`);
        }}
      >
        <label className={cx("name")}>{project_name}</label>
      </div>
    </ReactParallaxTilt>
  );
};

export default CardLarge;
