import { useProjectStore } from "../../../store/project";
import EdgeMemo from "./EdgeMemo";
import classNames from "classnames/bind";
import styles from "./EdgeMemo.module.scss";
import { useEffect } from "react";
import { useSelectedMarkDown } from "../../../store/selectedMarkdown";
const cx = classNames.bind(styles);

const EdgeList = () => {
  const edges = useProjectStore((state) => state.edges);
  const select = useSelectedMarkDown((state) => state.select);
  useEffect(() => {
    select(edges[0].contents[0]);
  }, []);
  return (
    <section className={cx("MemoPad")}>
      {edges.map((edge) => (
        <EdgeMemo key={edge.id} edge={edge} />
      ))}
    </section>
  );
};

export default EdgeList;
