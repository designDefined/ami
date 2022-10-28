import { useProjectStore } from "../../../store/project";
import CleanParser from "../Parser/CleanParser";
import styles from "./EdgeReader.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const EdgeReader = () => {
  const edges = useProjectStore((state) => state.edges);
  return (
    <section>
      {edges.map((edge) => (
        <div key={edge.id} className={cx("EdgeReader")}>
          {edge.contents.map((md) => (
            <CleanParser key={md.id} markDown={md} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default EdgeReader;