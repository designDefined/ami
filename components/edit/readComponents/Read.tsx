import styles from "./ReadComponents.module.scss";
import classNames from "classnames/bind";
import { IPage } from "../../../types/old/base";
import Atom from "./Atom";
import Navigator from "./Navigator";

interface Props {
  pages: IPage[];
}

const cx = classNames.bind(styles);

const Read = ({ pages }: Props) => {
  return (
    <div className={cx("wrapper")}>
      <section className={cx("Read")}>
        {pages.map((page) => (
          <div key={page.id} className={cx("Page")}>
            {page.atoms.map((atom) => (
              <Atom key={atom.id} atom={atom} />
            ))}
          </div>
        ))}
      </section>
      <Navigator pages={pages} />
    </div>
  );
};

export default Read;
