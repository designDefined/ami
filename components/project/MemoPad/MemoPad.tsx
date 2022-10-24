import { useProjectStore } from "../../../store/project";
import EdgeMemo from "./EdgeMemo";
import classNames from "classnames/bind";
import styles from "./EdgeMemo.module.scss";
import { useEffect } from "react";
const cx = classNames.bind(styles);

const MemoPad = () => {
  const edges = useProjectStore((state) => state.edges);

  return (
    <section className={cx("MemoPad")}>
      {edges.map((edge) => (
        <EdgeMemo key={edge.id} edge={edge} />
      ))}
    </section>
  );
};

export default MemoPad;
