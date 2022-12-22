import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import { AtomReader, AtomWriter } from "../Atom/Atom";
import ReactParallaxTilt from "react-parallax-tilt";
import { useState } from "react";
import { useText } from "../../../../store/text";
import {
  onAddPage,
  onDeletePage,
  onModifyPageName,
} from "../../handlers/memoEventHandler";
import { IPage } from "../../../../types/page";
import { IAtom } from "../../../../types/atom";
import { IIdentifier } from "../../../../types/general";

interface Props {
  page: IPage;
}

const cx = classNames.bind(styles);

const renderAtom = (atom: IAtom, inputAtomId: IIdentifier | null) => {
  if (atom.id === inputAtomId) return <AtomWriter key={atom.id} atom={atom} />;
  return <AtomReader key={atom.id} atom={atom} />;
};

const Page = ({ page }: Props) => {
  const { pageName, atoms } = page;
  const [nameInput, setNameInput] = useState<null | string>(null);
  const inputAtomId = useText((state) => state.identifier);

  return (
    <div className={cx("Page")}>
      <div className={cx("header")}>
        <button className={cx("button", "delete")} onClick={onDeletePage(page)}>
          삭제
        </button>
        <button
          className={cx("button", "modifyName")}
          onClick={() => {
            if (nameInput !== null) {
              //setPageName(nameInput)
              setNameInput(null);
            } else {
              setNameInput(pageName);
            }
          }}
        >
          수정
        </button>
        {nameInput !== null ? (
          <input
            className={cx("nameInput")}
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        ) : (
          <label className={cx("name")}>{pageName}</label>
        )}
      </div>
      <ul className={cx("list")}>
        {atoms.map((atom) => renderAtom(atom, inputAtomId))}
      </ul>
    </div>
  );
};

export const PageAdd = () => {
  return (
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={3000}
      transitionSpeed={8000}
      tiltAxis="y"
    >
      <button className={cx("PageAdd")} onClick={onAddPage()}>
        페이지 추가하기 +
      </button>
    </ReactParallaxTilt>
  );
};

export default Page;
