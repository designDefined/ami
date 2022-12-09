import { IAtom } from "../../../types/base";
import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { CSSProperties, useCallback, useMemo } from "react";
import createStyle from "../../../functions/create/createStyle";
import { IAtomInteraction } from "../../../types/interaction";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

interface Props {
  atom: IAtom;
}

const interactionsToClass = (interactions: IAtomInteraction[]) => {
  let result: string[] = [];
  for (let i = 0; i < interactions.length; i++) {
    if (interactions[i].interactionType === "click") {
      result.push("clickable");
    }
  }
  return result;
};

const Atom = ({ atom }: Props) => {
  const router = useRouter();
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom),
    [atom],
  );
  const interactionToClickEvent =
    useCallback((): React.MouseEventHandler<HTMLDivElement> => {
      for (let i = 0; i < atom.interactions.length; i++) {
        const target = atom.interactions[i];
        if (target.interactionType === "click") {
          if (target.external) {
            return () => (window.location.href = target.to);
          } else {
            return () =>
              router.push(`/meet/${router.query.project_id}/${target.to}`);
          }
        }
      }
      return () => null;
    }, [atom]);
  return (
    <div
      className={cx("Atom", ...interactionsToClass(atom.interactions))}
      style={atomStyle}
      onClick={interactionToClickEvent()}
    >
      {atom.content}
    </div>
  );
};

export default Atom;
