import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";
import { IProjectSummary } from "../../../types/old/base";
import CardSmallButton from "../Card/CardSmallButton";

const cx = classNames.bind(styles);

interface Props {
  projectsList: IProjectSummary[];
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
          <CardSmallButton label="프로젝트 추가" callback={writable.callback} />
        )}
      </div>
    </section>
  );
};
export default SectionHorizon;
