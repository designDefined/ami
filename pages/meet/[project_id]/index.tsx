import { NextPage } from "next";
import { useEffect } from "react";
import localStorageAPI from "../../../API/local/localStorageAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useProject } from "../../../store/project";

const ToMeet: NextPage = () => {
  const router = useRouter();
  const loadStatus = useProject((state) => state.loadStatus);
  const load = useProject((state) => state.load);
  const id = useProject((state) => state.id);
  const setPageStatus = useProject((state) => state.setPageStatus);

  useEffect(() => {
    if (router.query.project_id) {
      const routerId = Number(router.query.project_id);
      if (loadStatus !== "success" || routerId !== id) {
        localStorageAPI.getProjectById(routerId).then(({ status, data }) => {
          if (status === "localAPISuccess") {
            toast.success("Project Loaded");
            load(data);
            setPageStatus(0);
            router.replace(`/meet/${routerId}/${data.pages[0].id}`, undefined, {
              scroll: true,
            });
          } else {
            toast.error(`Project load failed with reason: ${data}`);
          }
        });
      }
    }
  }, [router.query.project_id]);
  return <div>loading...</div>;
};

export default ToMeet;
