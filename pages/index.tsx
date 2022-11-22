import { NextPage } from "next";
import HomeHeader from "../components/home/Header/Header";
import SectionBillboard from "../components/home/Section/SectionBillboard";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import SectionHorizon from "../components/home/Section/SectionHorizon";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useProjectList } from "../store/projectList";
import { getMyProjects, getTopProjects } from "../API/local/localStorageAPI";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const router = useRouter();
  const topProjectsList = useProjectList((state) => state.topProjects);
  const myProjectsList = useProjectList((state) => state.myProjects);
  const loadTopProjects = useProjectList((state) => state.setTopProjects);
  const loadMyProjects = useProjectList((state) => state.setMyProjects);

  const onAddMyProject = useCallback(() => {}, []);

  useEffect(() => {
    getTopProjects().then(({ status, data }) => {
      if (status === "localAPISuccess") {
        loadTopProjects(data);
      } else {
      }
    });
    getMyProjects().then(({ status, data }) => {
      if (status === "localAPISuccess") {
        loadMyProjects(data);
      } else {
      }
    });
  }, []);

  return (
    <article className={cx("Home")}>
      <HomeHeader />
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
