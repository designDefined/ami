import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProject } from "../../../store/project";
import localStorageAPI from "../../../API/local/localStorageAPI";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Meet.module.scss";
import Page from "../../../components/meet/Page/Page";
import { loadObserver } from "../../../store/intersectionObserver";

const cx = classNames.bind(styles);

const Meet: NextPage = () => {
  const router = useRouter();
  const loadStatus = useProject((state) => state.loadStatus);
  const load = useProject((state) => state.load);
  const id = useProject((state) => state.id);
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);
  const setPageStatus = useProject((state) => state.setPageStatus);

  useEffect(() => {
    if (router.query.project_id) {
      const routerId = Number(router.query.project_id);
      if (loadStatus !== "success" || routerId !== id) {
        localStorageAPI.getProjectById(routerId).then(({ status, data }) => {
          if (status === "localAPISuccess") {
            toast.success("Project Loaded");
            load(data);
            if (router.query.page_id) {
              const pageIndex = data.pages.findIndex(
                (page) => page.id === router.query.page_id,
              );
              if (pageIndex < 0) {
                setPageStatus(-1);
              } else {
                setPageStatus(pageIndex);
              }
            } else {
              router.push(`/meet/${routerId}/${data.pages[0].id}`, undefined, {
                scroll: true,
              });
            }
          } else {
            toast.error(`Project load failed with reason: ${data}`);
          }
        });
      } else {
        if (router.query.page_id) {
          const pageIndex = pages.findIndex(
            (page) => page.id === router.query.page_id,
          );
          if (pageIndex < 0) {
            setPageStatus(-1);
          } else {
            setPageStatus(pageIndex);
          }
        } else {
          setPageStatus(0);
          router.replace(`/meet/${routerId}/${pages[0].id}`, undefined, {
            scroll: true,
          });
        }
      }
    }
    loadObserver();
  }, [router.query.project_id, router.query.page_id]);

  return (
    <article className={cx("Meet")}>
      {loadStatus === "success" && <Page page={pages[pageStatus]} />}
      <div
        className={cx("modify")}
        onClick={async () => {
          await router.push(`/edit/${id}`);
        }}
      >
        ??????
      </div>
      <button
        className={cx("toHome")}
        onClick={() => {
          router.push("/");
        }}
      >
        {"< ????????? ????????????"}
      </button>
    </article>
  );
};

export default Meet;
