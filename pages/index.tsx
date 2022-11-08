import { NextPage } from "next";
import HomeHeader from "../components/home/Header/Header";
import SectionBillboard from "../components/home/Section/SectionBillboard";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import SectionHorizon from "../components/home/Section/SectionHorizon";

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  return (
    <article className={cx("Home")}>
      <HomeHeader />
      <main className={cx("sections")}>
        <SectionBillboard />
        <SectionHorizon />
        <SectionHorizon />
        <SectionHorizon />
      </main>
    </article>
  );
};

export default Home;
