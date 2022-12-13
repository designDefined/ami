import WidgetWrapper from "../Widget";
import {
  onChangePageNumberAttribute,
  onChangePageStringAttribute,
} from "../../../handlers/weaveEventHandler";
import styles from "./Info.module.scss";
import classNames from "classnames/bind";
import { IPage } from "../../../../../types/page";
import {
  PageBackgroundColorInput,
  PageHeightInput,
  PageTitleInput,
} from "../Inputs/PageInput";

const cx = classNames.bind(styles);

interface Props {
  selectedPage: IPage | false;
}

const PageInfo = ({ selectedPage: page }: Props) => {
  if (!page) {
    return (
      <WidgetWrapper name={"페이지를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }
  return (
    <WidgetWrapper name="페이지 정보">
      <section className={cx("info")}>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>기본 정보</div>
          <PageTitleInput page={page} />
          <PageHeightInput page={page} />
          <PageBackgroundColorInput page={page} />
        </div>
      </section>
    </WidgetWrapper>
  );
};

export default PageInfo;
