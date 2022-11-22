import { useProjectStore } from "../../../nouse/project";
import EdgeParser from "../Parser/EdgeParser";
import styles from "./EdgeReader.module.scss";
import classNames from "classnames/bind";
import Navigator from "../Navigator/Navigator";

const cx = classNames.bind(styles);

const EdgeReader = () => {
  const edges = useProjectStore((state) => state.edges);
  return (
    <section>
      {edges.map((edge) => (
        <div key={edge.id} className={cx("EdgeReader")}>
          {edge.contents.map((md) => (
            <EdgeParser key={md.id} markDown={md} />
          ))}
        </div>
      ))}
      <Navigator edges={edges} />
    </section>
  );
};

export default EdgeReader;
