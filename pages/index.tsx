import { NextPage } from "next";
import HomeHeader from "../components/home/Header/Header";
import SectionBillboard from "../components/home/Section/SectionBillboard";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import SectionHorizon from "../components/home/Section/SectionHorizon";
import { getProjects, useProjectsListStore } from "../store/api/projectsList";
import { postNewProject } from "../store/api/project";
import { useEffect } from "react";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const all = useProjectsListStore((state) => state.all);
  const router = useRouter();
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <article className={cx("Home")}>
      <HomeHeader />
      <main className={cx("sections")}>
        <SectionBillboard />
        <SectionHorizon
          projectsList={all}
          writable={{
            is: true,
            callback: (e) => {
              postNewProject().then((res) => {
                router.push(`/edit/${res.id}`);
              });
            },
          }}
        />
      </main>
    </article>
  );
};

export default Home;
