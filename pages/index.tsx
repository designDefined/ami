import styles from "./home.module.scss";
import { NextPage } from "next";
import EdgeReader from "../components/home/Reader/EdgeReader";
import { useEffect } from "react";
import { loadProject } from "../api/filesystem";
import classNames from "classnames/bind";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    loadProject();
  });
  return (
    <article className={cx("Home")}>
      <EdgeReader />
      <button
        className={cx("toProject")}
        onClick={() => {
          router.push("/project");
        }}
      >
        {"에디터 사용해보기 >"}
      </button>
    </article>
  );
};

export default Home;
