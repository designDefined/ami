import { useProject } from "../../../store/project";
import { toast } from "react-toastify";

const projectStore = useProject;

type empty = (e: null) => void;

export const onChangePage =
  (input: number, length: number): React.FormEventHandler<HTMLFormElement> =>
  (e) => {
    if (e) {
      e.preventDefault();
    }
    if (input >= 0 && input <= length) {
      projectStore.getState().setPageStatus(input - 1);
    } else {
      toast.error("wrong page number");
    }
  };

export const onPressAtom =
  (): React.MouseEventHandler<HTMLLIElement> => (e) => {};

export const onReleaseAtom = () => {};
