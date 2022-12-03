import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useProjectList } from "../store/projectList";
import localStorageAPI from "../API/local/localStorageAPI";

import HomeHeader from "../components/home/Header/Header";
import SectionBillboard from "../components/home/Section/SectionBillboard";
import SectionHorizon from "../components/home/Section/SectionHorizon";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import HomeBackground from "../components/home/Background/HomeBackground";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const topProjectsList = useProjectList((state) => state.topProjects);
  const myProjectsList = useProjectList((state) => state.myProjects);
  const loadTopProjects = useProjectList((state) => state.setTopProjects);
  const loadMyProjects = useProjectList((state) => state.setMyProjects);

  const onAddMyProject = useCallback(() => {}, []);

  useEffect(() => {
    localStorageAPI.getTopProjects().then(({ status, data }) => {
      if (status === "localAPISuccess") {
        loadTopProjects(data);
      } else {
      }
    });
    localStorageAPI.getMyProjects().then(({ status, data }) => {
      if (status === "localAPISuccess") {
        loadMyProjects(data);
      } else {
      }
    });
  }, []);

  return (
    <article className={cx("Home")}>
      <HomeHeader />
      <HomeBackground />
      <main className={cx("sections")}>
        <SectionBillboard projectsList={topProjectsList} />
        <SectionHorizon
          projectsList={myProjectsList}
          writable={{
            is: true,
            callback: onAddMyProject,
          }}
        />
      </main>
    </article>
  );
};

export default Home;
