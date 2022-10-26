import { Edge } from "../../../store/base/edge";
import classNames from "classnames/bind";
import styles from "./EdgeMemo.module.scss";
import { MarkDown } from "../../../store/base/markDown";
import { useSelectedMarkDown } from "../../../store/selectedMarkdown";
import MemoMarkDownReader from "./MemoMarkDown/MarkDownReader";
import MemoMarkDownWriter from "./MemoMarkDown/MarkDownWriter";

interface Props {
  edge: Edge;
}
const cx = classNames.bind(styles);

const parseMarkDown = (source: MarkDown, selected: MarkDown[]) => {
  if (selected.length < 1) {
    return <MemoMarkDownReader key={source.id} source={source} />;
  } else if (selected.length === 1) {
    return source === selected[0] ? (
      <MemoMarkDownWriter key={source.id} />
    ) : (
      <MemoMarkDownReader key={source.id} source={source} />
    );
  } else {
    return <MemoMarkDownReader key={source.id} source={source} />;
  }
};

const EdgeMemo = ({ edge }: Props) => {
  const { name, contents } = edge;
  const selectedMD = useSelectedMarkDown((state) => state.source);

  return (
    <div className={cx("EdgeMemo")}>
      <label className={cx("title")}>{name}</label>
      <ul className={cx("list")}>
        {contents.map((md) => parseMarkDown(md, selectedMD))}
      </ul>
    </div>
  );
};

export default EdgeMemo;
