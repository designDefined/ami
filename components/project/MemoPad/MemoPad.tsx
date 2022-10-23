import { useProjectStore } from "../../../store/project";
import EdgeMemo from "./EdgeMemo";

const MemoPad = () => {
  const edges = useProjectStore((state) => state.edges);

  return (
    <div>
      {edges.map((edge) => (
        <EdgeMemo key={edge.id} edge={edge} />
      ))}
    </div>
  );
};

export default MemoPad;
