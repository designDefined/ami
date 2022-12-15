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
import { hasEffect, parseExtensionToClass } from "../functions/parseExtension";
import {
  observeAtom,
  useIntersectionObserver,
} from "../../../store/intersectionObserver";
const cx = classNames.bind(styles);

interface Props {
  atom: IAtom;
}

const Atom = ({ atom }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const io = useIntersectionObserver((state) => state.current);
  const observedAtomIds = useIntersectionObserver(
    (state) => state.observedAtomIds,
  );
  useEffect(() => {
    if (
      atom.extension.filter((ext) =>
        ["fade", "slide"].includes(ext.extensionType),
      ).length > 0
    ) {
      if (ref.current && io) {
        observeAtom(ref.current, atom);
      }
    }
  }, [io, ref.current]);

  if (atom.type === "image") {
    const source = atom.content as typeof imageSampleList[number];
    return (
      <div
        id={atom.id}
        className={cx("Atom", [...parseExtensionToClass(atom.extension)], {
          isObserved: observedAtomIds.includes(atom.id),
        })}
        style={buildAtomStyle(atom, false)}
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
      id={atom.id}
      className={cx("Atom", [...parseExtensionToClass(atom.extension)], {
        isObserved: observedAtomIds.includes(atom.id),
      })}
      style={buildAtomStyle(atom, false)}
      ref={ref}
      onClick={() => {
        const targets = atom.extension.filter(
          (ext) => ext.extensionType === "internalLink",
        );
        if (targets.length > 0) {
          router.push(`/meet/${router.query.project_id}/${targets[0].value}`);
        }
      }}
    >
      {atom.content}
    </div>
  );
};

export default Atom;
