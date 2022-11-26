import styles from "./Saver.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../store/project";
import localStorageAPI from "../../../API/local/localStorageAPI";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const onSave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  const { id, writer, pages, projectName } = useProject.getState();
  localStorageAPI
    .postProjectById({ id, writer, pages, projectName })
    .then((res) => {
      if (res.success) {
        toast.success("성공적으로 저장되었습니다");
      }
    });
};

const Saver = () => {
  return (
    <div className={cx("button", "SaveLoader")}>
      <button className={cx("button", "save")} onClick={onSave}>
        저장
      </button>
    </div>
  );
};

export default Saver;
