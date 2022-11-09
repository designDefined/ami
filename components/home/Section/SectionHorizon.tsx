import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";
import { IProjectSum } from "../../../types/base";

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
      <div className={cx("label")}>Some Projects</div>
      <div className={cx("cards")}>
        {projectsList.map((project) => (
          <CardSmall key={project.id} project={project} />
        ))}
        {writable.is && <button onClick={writable.callback}>추가</button>}
      </div>
    </section>
  );
};
export default SectionHorizon;
