import { Heading } from "./Navigator";
import AnchorLink from "react-anchor-link-smooth-scroll";
import classNames from "classnames/bind";
import styles from "./Navigator.module.scss";

const cx = classNames.bind(styles);

interface Props {
  heading: Heading;
}

const NavItem = ({ heading }: Props) => {
  const { id, name, depth } = heading;
  return (
    <AnchorLink className={cx("NavItem", `depth-${depth}`)} href={"#" + id}>
      {name}
    </AnchorLink>
  );
};

export default NavItem;
