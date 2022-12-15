import { NextPage } from "next";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useProject } from "../store/project";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const router = useRouter();
  const clearProject = useProject((state) => state.clear);
  const [status, setStatus] = useState<number>(0);
  useEffect(() => {
    clearProject();
  }, []);

  return (
    <article
      className={cx("HomeTwo", { left: status === 1, right: status === 2 })}
    >
      <section
        className={cx("section", "ami")}
        onMouseEnter={() => {
          setStatus(1);
        }}
        onMouseLeave={() => setStatus(0)}
        onClick={() => router.push("/meet/0")}
      >
        <div className={cx("main")}>
          <div className={cx("l1")}>Portfolio</div>
          <div className={cx("l2")}>&</div>
          <div className={cx("l3")}>Project</div>
        </div>
        <div className={cx("sub")}>
          Am.I의 제작과정과 작업 후기, 제작자의 포트폴리오를 확인하세요
        </div>
      </section>
      <section
        className={cx("section", "visit")}
        onMouseEnter={() => {
          setStatus(2);
        }}
        onMouseLeave={() => setStatus(0)}
        onClick={() => router.push("/meet/1")}
      >
        <div className={cx("main")}>
          <div className={cx("r1")}>방명록</div>
        </div>
        <div className={cx("sub")}>
          <div className={cx("r2")}>
            우측 상단의 수정 버튼을 눌러 AM.I를 직접 체험해보고 방명록을
            작성하세요
          </div>
          <div className={cx("r3")}>
            우측 하단의 저장 버튼을 누르면 과제전에 온 다른 사람들도 당신의
            방명록을 확인할 수 있습니다!
          </div>
        </div>
      </section>
      <div className={cx("bar")} />
      <div className={cx("center")}>AM.I 1.0: Grayscale</div>
    </article>
  );
};

export default Home;
