import { IPage } from "../../../../../types/base";
import styles from "./PageWidget.module.scss";
import classNames from "classnames/bind";
import WidgetWrapper from "../Widget";
import {
  onChangeAtomNumberAttribute,
  onChangePageNumberAttribute,
  onChangePageStringAttribute,
} from "../../../handlers/weaveEventHandler";

const cx = classNames.bind(styles);

interface PropPage {
  selectedPage: IPage;
}
interface PropPages {
  pages: IPage[];
}

export const PageInfo = ({ selectedPage: page }: PropPage) => {
  if (!page) {
    return (
      <WidgetWrapper name={"페이지를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }
  return (
    <WidgetWrapper name="페이지 정보">
      <div className={cx("PageInfo")}>
        <div className={cx("section")}>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>높이:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={page.offsetHeight}
                onChange={onChangePageNumberAttribute("offsetHeight", page)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>배경:</div>
              <input
                className={cx("attributeInput")}
                type="color"
                value={page.backgroundColor}
                onChange={onChangePageStringAttribute("backgroundColor", page)}
              />
            </div>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
};

const PageWidget = ({ pages }: PropPages) => {
  return <></>;
};

export default PageWidget;
