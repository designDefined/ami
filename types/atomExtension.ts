export const clickInteractions: IClickInteraction[] = [
  {
    extensionType: "internalLink",
    name: "내부 링크",
    value: "",
    classes: ["link"],
  },
  {
    extensionType: "externalLink",
    name: "외부 링크",
    value: "",
    classes: ["link"],
  },
];
export const shadowEffects = [
  {
    extensionType: "boxShadow",
    name: "그림자",
    value: "1",
    classes: ["bosShadow1"],
  },
];
export const fadeEffects = [
  {
    extensionType: "fade",
    name: "페이드 인",
    value: "in",
    classes: ["fadeIn"],
  },
] as const;
export const slideEffects = [
  {
    extensionType: "slide",
    name: "왼쪽",
    value: "left",
    classes: ["slideFromLeft"],
  },
  {
    extensionType: "slide",
    name: "오른쪽",
    value: "right",
    classes: ["slideFromRight"],
  },
  {
    extensionType: "slide",
    name: "위",
    value: "top",
    classes: ["slideFromTop"],
  },
  {
    extensionType: "slide",
    name: "아래",
    value: "bottom",
    classes: ["slideFromBottom"],
  },
] as const;
export type IClickInteraction =
  | {
      extensionType: "internalLink";
      name: "내부 링크";
      value: string;
      classes: ["link"];
    }
  | {
      extensionType: "externalLink";
      name: "외부 링크";
      value: string;
      classes: ["link"];
    };
export type IShadowEffect = typeof shadowEffects[number];
export type IFadeEffect = typeof fadeEffects[number];
export type ISlideEffect = typeof slideEffects[number];

export type IAtomExtension =
  | IClickInteraction
  | IShadowEffect
  | IFadeEffect
  | ISlideEffect;
