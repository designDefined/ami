import { resetProject, saveEdges } from "../../../api/filesystem";
import styles from "./Saver.module.scss";
import classNames from "classnames/bind";
import { postCurrentProject } from "../../../store/api/project";

const cx = classNames.bind(styles);

const Saver = () => {
  return (
    <div className={cx("button", "SaveLoader")}>
      <button
        className={cx("button", "save")}
        onClick={() => {
          postCurrentProject();
        }}
      >
        저장
      </button>
    </div>
  );
};

export default Saver;
