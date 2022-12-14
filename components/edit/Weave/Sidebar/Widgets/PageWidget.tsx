import { useSelection } from "../../../../../store/selection";
import PageInfo from "../Info/PageInfo";
import { PageList } from "../Lists/PageList";

const PageWidget = () => {
  const { type, data: page } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo selectedPage={type === "page" ? page : false} />
      <PageList selectedPage={type === "page" ? page : false} />
    </>
  );
};

export default PageWidget;
