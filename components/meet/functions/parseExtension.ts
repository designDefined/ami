import { IAtomExtension } from "../../../types/atomExtension";

export const parseExtensionToClass = (extensions: IAtomExtension[]) =>
  extensions.map((ext) => ext.classes).flat();

export const hasEffect = (
  extensions: IAtomExtension[],
  target: IAtomExtension,
) =>
  extensions.filter(
    (item) =>
      item.extensionType === target.extensionType &&
      item.value === target.value,
  ).length > 0;
