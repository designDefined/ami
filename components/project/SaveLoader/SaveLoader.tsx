import styles from "./SaveLoader.module.scss";
import { resetProject, saveEdges } from "../../../api/filesystem";
import { useProjectStore } from "../../../store/project";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SaveLoader = () => {
  const edges = useProjectStore((state) => state.edges);
  const setEdges = useProjectStore((state) => state.setEdges);

  return (
    <div className={cx("button", "SaveLoader")}>
      <button
        className={cx("button", "save")}
        onClick={() => {
          saveEdges();
        }}
      >
        저장
      </button>
      <button
        className={cx("button", "load")}
        onClick={() => {
          resetProject();
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default SaveLoader;
