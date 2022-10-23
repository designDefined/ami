import { Edge } from "../../../store/base/edge";
import MarkDownParser from "../../common/EdgeMarkDown/MarkDownParser";
import { nanoid } from "nanoid";
interface EdgeMemoProps {
  edge: Edge;
}

const EdgeMemo = ({ edge }: EdgeMemoProps) => {
  const { name, contents } = edge;
  return (
    <div>
      {contents.map((edgeMarkDown) => (
        <MarkDownParser
          key={nanoid(5)}
          edgeMarkDown={edgeMarkDown}
        />
      ))}
    </div>
  );
};

export default EdgeMemo;
