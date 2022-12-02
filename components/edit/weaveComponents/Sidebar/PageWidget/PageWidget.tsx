import { IPage } from "../../../../../types/base";
import styles from "./PageWidget.module.scss";
import classNames from "classnames/bind";
import WidgetWrapper from "../Widget";

const cx = classNames.bind(styles);

interface PropPage {
  page: IPage;
}

export const PageInfo = ({ page }: PropPage) => {
  return (
    <WidgetWrapper name="페이지 정보">
      <div />
    </WidgetWrapper>
  );
};
