import styles from "./present.module.scss";
import classNames from "classnames/bind";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getProject, useProjectStore } from "../../store/api/project";
import { useRouter } from "next/router";
import { IAtom, IPage } from "../../types/base";
import { submitAtom } from "../Weave/WeaveEventHandler";

const cx = classNames.bind(styles);

const Page = ({ page }: { page: IPage }) => {
  return (
    <div className={cx("Page")}>
      {page.atoms
        .filter((atom) => atom.style.placed)
        .map((atom) => (
          <Atom key={atom.id} atom={atom} />
        ))}
    </div>
  );
};

const Atom = ({ atom }: { atom: IAtom }) => {
  const { style, markdown } = atom;
  return (
    <div
      className={cx("Atom", `${markdown.type}`)}
      style={{ left: style.geometry.x, top: style.geometry.y }}
    >
      {atom.content}
    </div>
  );
};

const Present: NextPage = () => {
  const [pageStatus, setPageStatus] = useState<number>(0);
  const [status, setStatus] = useState<number>(1);

  const router = useRouter();

  const pages = useProjectStore((state) => state.pages);
  const id = useProjectStore((state) => state.id);

  useEffect(() => {
    if (router.query.project_id) {
      getProject(Number(router.query.project_id)).then((result) => {
        if (!result) {
          router.push("/");
        }
      });
    }
  }, [router.query]);

  useEffect(() => {
    setTimeout(() => setStatus(0), 1);
  }, [pageStatus]);
  return (
    <article
      className={cx("Present", { nextPage: status === 1 })}
      onClick={(e) => {
        e.preventDefault();
        if (pageStatus !== pages.length - 1) {
          setTimeout(() => {
            setPageStatus(pageStatus + 1);
          }, 1000);
          setStatus(1);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (pageStatus !== 0) {
          setTimeout(() => {
            setPageStatus(pageStatus - 1);
          }, 1000);
          setStatus(1);
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      <Page page={pages[pageStatus]} />
      {pageStatus === pages.length - 1 && (
        <div
          className={cx("temp")}
          onClick={() => {
            router.push(`/edit/${id}`);
          }}
        >
          직접 편집해보기
        </div>
      )}
    </article>
  );
};
export default Present;
