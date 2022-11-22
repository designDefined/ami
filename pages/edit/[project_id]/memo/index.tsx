import { NextPage } from "next";
import { useRouter } from "next/router";
import { useProject } from "../../../../store/project";
import { useEffect } from "react";
import { getProjectById } from "../../../../API/local/localStorageAPI";
import { toast } from "react-toastify";

const Memo: NextPage = () => {
  const router = useRouter();
  const id = useProject((state) => state.id);
  const loadStatus = useProject((state) => state.loadStatus);
  const load = useProject((state) => state.load);

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

  switch (loadStatus) {
    case "loading":
      return <div>loading</div>;
    case "success":
      return <div>success</div>;
    case "fail":
      return <div>fail</div>;
  }
};

export default Memo;
