import { MarkDown } from "../../../store/base/markDown";
import _ from "lodash";
import { Edge } from "../../../store/base/edge";

interface Props {
  edges: Edge[];
}
const headingTypes = ["h1", "h2", "h3"];

const Navigator = ({ edges }: Props) => {
  const edgeHeadings = _.map(edges, (edge) => {
    const heading = _.filter(edge.contents, (md) =>
      _.includes(headingTypes, md.type),
    );
    return { title: edge.name, heading };
  });

  return (
    <nav>
      {edgeHeadings.map((heading) => (
        <button>{heading.title}</button>
      ))}
    </nav>
  );
};

export default Navigator;
