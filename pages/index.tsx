import styles from "./home.module.scss";
import { NextPage } from "next";
import EdgeReader from "../components/home/Reader/EdgeReader";
import { useEffect } from "react";
import { loadProject } from "../api/filesystem";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  useEffect(() => {
    loadProject();
  });
  return (
    <article className={cx("Home")}>
      <EdgeReader />
    </article>
  );
};

export default Home;
