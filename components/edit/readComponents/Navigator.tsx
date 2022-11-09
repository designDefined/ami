import { IMarkDownType, IPage } from "../../../types/base";
import { toNumber } from "lodash";
import { useState } from "react";
import NavItem from "../../temporal/Navigator/NavItem";
import styles from "./ReadComponents.module.scss";
import classNames from "classnames/bind";

interface Props {
  pages: IPage[];
}

const cx = classNames.bind(styles);

export interface Heading {
  name: string;
  id: string;
  depth: number;
}
const headingTypes: IMarkDownType[] = ["h1", "h2", "h3"];

const Navigator = ({ pages }: Props) => {
  const headings: Heading[] = pages
    .map((page) => {
      const edgeHeading = { id: page.id, name: page.page_name, depth: 0 };
      const mdHeading = page.atoms
        .filter((atom) => headingTypes.includes(atom.markdown.type))
        .map((atom) => {
          return {
            id: atom.id,
            name: atom.content,
            depth: toNumber(atom.markdown.type[1]),
          };
        });
      return [edgeHeading, ...mdHeading];
    })
    .flat();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={cx("NavWrapper", { open })}>
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
