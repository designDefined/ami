import { IPage } from "../../../../../types/page";

import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  changePageNumberAttribute,
  changePageStringAttribute,
} from "../../functions/changeAttribute";
const cx = classNames.bind(styles);

interface Props {
  page: IPage;
}

export const PageTitleInput = ({ page }: Props) => {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    setTitle(page.pageName);
  }, [page]);

  return (
    <div className={cx("horizon")}>
      이름:
      <input
        className={cx("input", "long")}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            changePageStringAttribute(title, "pageName", page);
          }
        }}
        onBlur={() => {
          changePageStringAttribute(title, "pageName", page);
        }}
      />
      <button
        className={cx("button")}
        onClick={() => {
          changePageStringAttribute(title, "pageName", page);
        }}
      >
        변경
      </button>
    </div>
  );
};

export const PageHeightInput = ({ page }: Props) => {
  return (
    <div className={cx("horizon")}>
      높이:
      <input
        className={cx("range")}
        type="range"
        min={937}
        max={6000}
        onChange={(e) => {
          changePageNumberAttribute(e.target.value, "offsetHeight", page);
        }}
      />
      <input
        className={cx("input")}
        type="number"
        value={page.offsetHeight}
        onChange={(e) => {
          changePageNumberAttribute(e.target.value, "offsetHeight", page);
        }}
      />
    </div>
  );
};

export const PageBackgroundColorInput = ({ page }: Props) => (
  <div className={cx("horizon")}>
    배경 색상:
    <input
      type="color"
      value={page.backgroundColor}
      onChange={(e) => {
        changePageStringAttribute(e.target.value, "backgroundColor", page);
      }}
    />
    <button
      className={cx("button")}
      onClick={() => {
        changePageStringAttribute("#000000FF", "backgroundColor", page);
      }}
    >
      투명
    </button>
  </div>
);
