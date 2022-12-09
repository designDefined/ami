import { IAtom } from "../../../types/base";
import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
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
    }, [atom.interactions]);
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            console.log(entry);
            entry.target.classList.add("IO");
          }
        },
        {
          threshold: 1.0,
          rootMargin: "20px",
        },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref.current]);

  return (
    <div
      className={cx("Atom", ...interactionsToClass(atom.interactions))}
      style={atomStyle}
      onClick={interactionToClickEvent()}
      ref={ref}
    >
      {atom.content}
    </div>
  );
};

export default Atom;
