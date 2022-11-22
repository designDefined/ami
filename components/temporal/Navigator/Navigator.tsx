import { MarkDownType } from "../../../nouse/base/markDown";
import _, { toNumber } from "lodash";
import { Edge } from "../../../nouse/base/edge";
import classNames from "classnames/bind";
import styles from "./Navigator.module.scss";
import NavItem from "./NavItem";
import { useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  edges: Edge[];
}
export interface Heading {
  name: string;
  id: string;
  depth: number;
}
const headingTypes: MarkDownType[] = ["h1", "h2", "h3"];

const Navigator = ({ edges }: Props) => {
  const headings: Heading[] = edges
    .map((edge) => {
      const edgeHeading = { id: edge.id, name: edge.name, depth: 0 };
      const mdHeading = edge.contents
        .filter((md) => headingTypes.includes(md.type))
        .map((md) => {
          return { id: md.id, name: md.innerText, depth: toNumber(md.type[1]) };
        });
      return [edgeHeading, ...mdHeading];
    })
    .flat();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={cx("Wrapper", { open })}>
      <nav className={cx("Navigator")}>
        {headings.map((heading) => (
          <NavItem key={heading.id} heading={heading} />
        ))}
      </nav>
      <button
        className={cx("button")}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? "<" : ">"}
      </button>
    </div>
  );
};

export default Navigator;
