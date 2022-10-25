import { Edge } from "../../../store/base/edge";
import MarkDownParser from "../../common/EdgeMarkDown/MarkDownParser";
import { nanoid } from "nanoid";
import classNames from "classnames/bind";
import styles from "./EdgeMemo.module.scss";
import MarkDownWriter from "../../common/EdgeMarkDown/MarkDownWriter";
import useInputValueStore from "../../../store/inputValue";
import { useProjectStore } from "../../../store/project";
import {
  EdgeMarkDownType,
  initialNormalEdgeMarkDown,
} from "../../../store/base/edgeMarkDown";

interface EdgeMemoProps {
  edge: Edge;
}
const cx = classNames.bind(styles);

const EdgeMemo = ({ edge }: EdgeMemoProps) => {
  const { name, contents } = edge;
  const initiateInputValue = useInputValueStore(
    (state) => state.initiateValue,
  );
  const resetValue = useInputValueStore(
    (state) => state.resetValue,
  );
  const updateEdge = useProjectStore(
    (state) => state.updateEdge,
  );
  const updateMarkDown = useProjectStore(
    (state) => state.updateMarkDown,
  );
  const addMarkDown = useProjectStore(
    (state) => state.addMarkDown,
  );

  return (
    <div className={cx("EdgeMemo")}>
      <label>{name}</label>
      {contents.map((edgeMarkDown) => {
        if (!edgeMarkDown.isEditing) {
          return (
            <div
              className={cx("Line", "read")}
              key={edgeMarkDown.id}
            >
              <MarkDownParser edgeMarkDown={edgeMarkDown} />
            </div>
          );
        } else {
          if (edgeMarkDown.innerText.length > 0)
            initiateInputValue(
              edgeMarkDown.type,
              edgeMarkDown.innerText,
            );
          return (
            <div
              className={cx("Line", "write")}
              key={edgeMarkDown.id}
            >
              <MarkDownWriter
                source={edgeMarkDown}
                setter={(type, input) => {
                  updateMarkDown(edge, edgeMarkDown, {
                    type,
                    innerText: input,
                  });
                  resetValue();
                }}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default EdgeMemo;
