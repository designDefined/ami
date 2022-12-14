import { useSelection } from "../../../../../store/selection";
import { AtomInfo } from "../Info/AtomInfo";
import { IPage } from "../../../../../types/page";
import PageInfo from "../Info/PageInfo";
import AtomList from "../Lists/AtomList";

interface Props {
  page: IPage;
}

const AtomWidget = ({ page }: Props) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <AtomInfo selectedAtom={type === "atom" ? atom : false} page={page} />
      <AtomList selectedAtom={type === "atom" ? atom : false} page={page} />
      <PageInfo selectedPage={page} />
    </>
  );
};

export default AtomWidget;
