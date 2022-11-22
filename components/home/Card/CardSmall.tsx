import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { IProjectSummary } from "../../../types/base";
import { useRouter } from "next/router";

interface Props {
  project: IProjectSummary;
}

const cx = classNames.bind(styles);
const CardSmall = ({ project }: Props) => {
  const router = useRouter();
  const { id, project_name } = project;
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
        <label className={cx("name")}>{project_name}</label>
      </div>
    </ReactParallaxTilt>
  );
};

export default CardSmall;
