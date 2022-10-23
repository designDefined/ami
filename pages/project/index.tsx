import styles from "project.module.scss";
import { NextPage } from "next";
import { useProjectStore } from "../../store/project";

const Project: NextPage = () => {
  const title = useProjectStore((state) => state.title);
  const status = useProjectStore((state) => state.status);

  switch (status) {
    case "clean":
      return <div>{title}</div>;
    case "styled":
      return <div />;
  }
};

export default Project;
