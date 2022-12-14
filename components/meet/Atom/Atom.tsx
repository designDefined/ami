import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { IAtomInteraction } from "../../../types/old/interaction";
import { useRouter } from "next/router";
import imageSample, {
  imageSampleList,
} from "../../../public/assets/images/images";

import Image from "next/image";
import buildAtomStyle from "../../../functions/create/buildAtomStyle";
import { IAtom } from "../../../types/atom";
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
    if (interactions[i].interactionType === "scroll") {
      result.push("invisible");
    }
  }
  return result;
};

const Atom = ({ atom }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

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
            //console.log(atom.interactions);

            if (
              atom.interactions.findIndex(
                (item) => item.interactionType === "scroll",
              ) >= 0
            ) {
              console.log(atom.interactions);

              entry.target.classList.add("IO");
            }
          }
        },
        {
          threshold: 1.0,
          rootMargin: "-30px",
        },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref.current, atom.interactions]);

  if (atom.type === "image") {
    const source = atom.content as typeof imageSampleList[number];
    return (
      <div
        className={cx("Atom", ...interactionsToClass(atom.interactions))}
        style={buildAtomStyle(atom, false)}
        onClick={interactionToClickEvent()}
        ref={ref}
      >
        {
          <Image
            src={imageSample[source]}
            alt={atom.content}
            width={atom.offsetWidth}
          />
        }
      </div>
    );
  }

  return (
    <div
      className={cx("Atom", ...interactionsToClass(atom.interactions))}
      style={buildAtomStyle(atom, false)}
      onClick={interactionToClickEvent()}
      ref={ref}
    >
      {atom.content}
    </div>
  );
};

export default Atom;
