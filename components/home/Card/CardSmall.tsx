import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { IProjectSummary } from "../../../types/old/base";
import { useRouter } from "next/router";

interface Props {
  project: IProjectSummary;
}

const cx = classNames.bind(styles);
const CardSmall = ({ project }: Props) => {
  const router = useRouter();
  const { id, projectName } = project;
  return (
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={500}
      transitionSpeed={2000}
    >
      <div
        className={cx("Card", "small")}
        onClick={() => {
          router.push(`/edit/${id}`);
        }}
      >
        <div className={cx("thumbnail")}></div>
        <div className={cx("content")}>
          <div className={cx("name")}>{projectName}</div>
        </div>
      </div>
    </ReactParallaxTilt>
  );
};

export default CardSmall;
