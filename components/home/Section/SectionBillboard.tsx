import CardLarge from "../Card/CardLarge";
import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import CardSmall from "../Card/CardSmall";
import ReactParallaxTilt from "react-parallax-tilt";
import { IProjectSum } from "../../../types/old/base";

interface Props {
  projectsList: IProjectSum[];
}
const cx = classNames.bind(styles);

const SectionBillboard = ({ projectsList }: Props) => {
  return (
    <section className={cx("Billboard")}>
      {projectsList.length > 0 && (
        <>
          <div className={cx("main")}>
            <CardLarge project={projectsList[0]} />
          </div>
          <div className={cx("sub")}>
            {projectsList.slice(1).map((project) => (
              <CardSmall key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
export default SectionBillboard;
