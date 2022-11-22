import { IWithId } from "../../types/base";

interface IConfig {
  addContinuously: boolean;
  indexToAdd: number;
}

const defaultConfig = (indexToAdd: number): IConfig => ({
  addContinuously: true,
  indexToAdd,
});

export const manipulateWithId = <T extends IWithId<number | string>>(
  array: T[],
  target: T | T[],
  inputConfig?: Partial<IConfig>,
): T[] => {
  //set config
  const config = inputConfig
    ? { ...defaultConfig(array.length), ...inputConfig }
    : defaultConfig(array.length);

  //manipulate array
  if (Array.isArray(target)) {
    //multiple targets
    let nextIndex = config.indexToAdd;
    for (let i = 0; i < target.length; i++) {
      const targetIndex = array.findIndex((item) => item.id === target[i].id);
      if (targetIndex < 0) {
        //add new item
        array.splice(nextIndex, 0, target[i]);
      } else {
        //change existing item
        array[targetIndex] = target[i];
      }
      //change index
      if (config.addContinuously) {
        nextIndex = targetIndex + 1;
      } else {
        nextIndex = array.length;
      }
    }
    return array;
  } else {
    //single target
    const targetIndex = array.findIndex((item) => item.id === target.id);
    if (targetIndex < 0) {
      //add new item
      array.splice(config.indexToAdd, 0, target);
      return array;
    } else {
      //change existing item
      array[targetIndex] = target;
      return array;
    }
  }
};
