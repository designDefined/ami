import { IPage } from "../../../../types/base";

interface Props {
  page: IPage;
}

const Page = ({ page }: Props) => {
  return <div>{page.id}</div>;
};

export default Page;
