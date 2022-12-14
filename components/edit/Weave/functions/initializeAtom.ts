import { ITextAtom } from "../../../../types/atom";

export const initializeTextAtom = (atom: ITextAtom): ITextAtom => {
  const styleOverloaded: Partial<ITextAtom> = {};
  switch (atom.markdownType) {
    case "h1":
      styleOverloaded.fontSize = 80;
    case "h2":
    case "h3":
    case "h4":
    case "p":
  }

  return { ...atom, ...styleOverloaded };
};
