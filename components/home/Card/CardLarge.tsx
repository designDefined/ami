import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { useRouter } from "next/router";
import { IProjectSummary } from "../../../types/old/base";
import Image from "next/image";
import { thumbnail1 } from "../../../public/assets/thumbnails";

interface Props {
  project: IProjectSummary;
}

const cx = classNames.bind(styles);

const CardLarge = ({ project }: Props) => {
  const { id, writer, projectName } = project;

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
        onClick={async () => {
          await router.push(`/meet/${id}`);
        }}
      >
        <div className={cx("thumbnail")}>
          <Image src={thumbnail1} alt="sample Thumbnail" width={200} />
        </div>
        <div className={cx("content")}>
          <div className={cx("title")}>{projectName}</div>
          <div className={cx("writer")}>by {writer.userName}</div>
        </div>
      </div>
    </ReactParallaxTilt>
  );
};

export default CardLarge;
