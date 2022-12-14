import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";

import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import {
  getClickInteraction,
  getClickInteractionValue,
  onAddImageAtom,
  onAddScroll,
  onChangeAtomNumberAttribute,
  onChangeAtomStringAttribute,
  onChangeClickInteraction,
  onDeleteScroll,
  onPressListedAtom,
  updateAtomInfo,
} from "../../../handlers/weaveEventHandler";
import { useText } from "../../../../../store/text";
import { useEffect } from "react";
import { imageSampleList } from "../../../../../public/assets/images/images";
import { AtomInfo } from "../Info/AtomInfo";
import { IPage } from "../../../../../types/page";
import { IAtom } from "../../../../../types/atom";
import { IMarkDownType } from "../../../../../types/old/base";
import PageInfo from "../Info/PageInfo";
import AtomList from "../Lists/AtomList";
const cx = classNames.bind(styles);

interface Props {
  page: IPage;
}

const AtomWidget = ({ page }: Props) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo selectedPage={page} />
      <AtomInfo selectedAtom={type === "atom" ? atom : false} page={page} />
      <AtomList selectedAtom={type === "atom" ? atom : false} page={page} />
    </>
  );
};

export default AtomWidget;
