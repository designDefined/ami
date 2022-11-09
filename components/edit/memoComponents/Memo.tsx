import { IPage } from "../../../types/base";
import Page from "./Page";
import Hint from "../Hint/Hint";
import Saver from "../Saver/Saver";

interface Props {
  pages: IPage[];
}

const Memo = ({ pages }: Props) => (
  <section>
    <Saver />
    {pages.map((page) => (
      <Page key={page.id} page={page} />
    ))}
    <Hint />
  </section>
);

export default Memo;
