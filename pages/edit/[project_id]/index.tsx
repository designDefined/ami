import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProject } from "../../../store/project";
import { getProjectById } from "../../../API/local/localStorageAPI";
import { toast } from "react-toastify";

const Edit: NextPage = () => {
  const router = useRouter();
  const id = useProject((state) => state.id);
  const loadStatus = useProject((state) => state.loadStatus);
  const load = useProject((state) => state.load);
  const defaultStatus = "memo";

  //load project logic
  useEffect(() => {
    if (router.query.project_id) {
      const routerId = Number(router.query.project_id);
      if (loadStatus !== "success" || routerId !== id) {
        getProjectById(Number(router.query.project_id)).then(
          ({ status, data }) => {
            if (status === "localAPISuccess") {
              toast.success("Project Loaded");
              load(data);
            } else {
              toast.error(`Project load failed with reason: ${data}`);
            }
          },
        );
      }
    }
  }, [router.query.project_id]);

  useEffect(() => {
    if (loadStatus === "success") {
      router.push(`/edit/${router.query.project_id}/${defaultStatus}`);
    }
  }, [loadStatus]);
  return <div />;
};

export default Edit;
