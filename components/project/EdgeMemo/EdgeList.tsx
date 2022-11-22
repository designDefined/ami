import { useProjectStore } from "../../../nouse/project";
import EdgeMemo from "./EdgeMemo";
import classNames from "classnames/bind";
import styles from "./EdgeMemo.module.scss";

const cx = classNames.bind(styles);

const EdgeList = () => {
  const edges = useProjectStore((state) => state.edges);
  return (
    <section className={cx("EdgeList")}>
      {edges.map((edge) => (
        <EdgeMemo key={edge.id} edge={edge} />
      ))}
    </section>
  );
};

export default EdgeList;
