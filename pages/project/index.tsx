import styles from "project.module.scss";
import { NextPage } from "next";
import { useProjectStore } from "../../store/project";
import MemoPad from "../../components/project/MemoPad/MemoPad";

const Project: NextPage = () => {
  const title = useProjectStore((state) => state.title);
  const status = useProjectStore((state) => state.status);

  return (
    <article>
      <MemoPad />
    </article>
  );
};

export default Project;
