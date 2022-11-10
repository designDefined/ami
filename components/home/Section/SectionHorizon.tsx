import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";
import { IProjectSum } from "../../../types/base";
import ReactParallaxTilt from "react-parallax-tilt";

const cx = classNames.bind(styles);

interface Props {
  projectsList: IProjectSum[];
  writable: {
    is: boolean;
    callback: React.MouseEventHandler<HTMLButtonElement>;
  };
}

const SectionHorizon = ({ projectsList, writable }: Props) => {
  return (
    <section className={cx("Horizon")}>
      <div className={cx("label")}>Local Projects</div>
      <div className={cx("cards")}>
        {projectsList.map((project) => (
          <CardSmall key={project.id} project={project} />
        ))}
        {writable.is && projectsList.length < 5 && (
          <ReactParallaxTilt
            tiltReverse
            glareEnable={false}
            perspective={500}
            transitionSpeed={2000}
          >
            <button className={cx("add")} onClick={writable.callback}>
              프로젝트 추가
            </button>
          </ReactParallaxTilt>
        )}
      </div>
    </section>
  );
};
export default SectionHorizon;
