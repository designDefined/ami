import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { IEditStatus, useProject } from "../../../store/project";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);

const Header = () => {
  const status = useProject((state) => state.editStatus);
  const setStatus = useProject((state) => state.setEditStatus);
  const projectName = useProject((state) => state.projectName);
  const projectId = useProject((state) => state.id);
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);
  const router = useRouter();

  const handleStatusButton =
    (target: IEditStatus): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      if (status !== target) {
        setStatus(target);
      }
    };

  return (
    <header className={cx("Header")}>
      {projectName}
      <div className={cx("modes")}>
        <button
          className={cx({ selected: status === "memo" })}
          onClick={handleStatusButton("memo")}
        >
          메모
        </button>
        <button
          className={cx({ selected: status === "weave" })}
          onClick={handleStatusButton("weave")}
        >
          편집
        </button>
        <button
          className={cx({ selected: status === "preview" })}
          onClick={handleStatusButton("preview")}
        >
          모바일
        </button>
        <button
          onClick={() => {
            router.push(`/meet/${projectId}/${pages[pageStatus].id}`);
          }}
        >
          배포
        </button>
      </div>
    </header>
  );
};
export default Header;
