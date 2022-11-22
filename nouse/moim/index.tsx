import { NextPage } from "next";
import { useRouter } from "next/router";
import { useProjectStore } from "../../store/api/project";
import Header from "../../components/edit/Header/Header";
import Read from "../../components/edit/readComponents/Read";
import Memo from "../../components/edit/memoComponents/Memo";
import { useEffect, useState } from "react";
import styles from "./Moim.module.scss";
import classNames from "classnames/bind";
import { moim1 } from "../data";
import ReadByPage from "../../components/edit/readComponents/ReadByPage";

const cx = classNames.bind(styles);

const Moim: NextPage = () => {
  const router = useRouter();
  const name = useProjectStore((state) => state.project_name);
  const pages = useProjectStore((state) => state.pages);
  const load = useProjectStore((state) => state.load);
  const [status, setStatus] = useState<string>("read");

  useEffect(() => {
    load(moim1);
  });

  return (
    <article className={cx("Project")}>
      {/*<Header name={name} />*/}
      {status === "read" && <ReadByPage pages={pages} />}
      {status === "memo" && <Memo pages={pages} />}
      <button
        className={cx("toHome")}
        onClick={() => {
          router.push("/");
        }}
      >
        {"< 홈으로 돌아가기"}
      </button>
      <button
        className={cx("changeMode")}
        onClick={() => {
          if (status === "memo") {
            setStatus("read");
          } else {
            setStatus("memo");
          }
        }}
      >
        수정하기
      </button>
    </article>
  );
};

export default Moim;
