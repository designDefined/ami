import { IWithId } from "../../types/base";

export interface IManipulateWithIdConfig {
  addContinuously: boolean;
  indexToAdd: number;
  isDelete: boolean;
}

export const defaultManipulateWithIdConfig = (
  indexToAdd: number,
): IManipulateWithIdConfig => ({
  addContinuously: true,
  indexToAdd,
  isDelete: false,
});

export const manipulateWithId = <T extends IWithId<number | string>>(
  array: T[],
  target: T | T[],
  inputConfig?: Partial<IManipulateWithIdConfig>,
): T[] => {
  //set config
  const config = inputConfig
    ? { ...defaultManipulateWithIdConfig(array.length), ...inputConfig }
    : defaultManipulateWithIdConfig(array.length);
  /****** Delete ******/
  if (config.isDelete) {
    if (Array.isArray(target)) {
      const targetIds = target.map((item) => item.id);
      return array.filter((item) => !targetIds.includes(item.id));
    } else {
      return array.filter((item) => item.id !== target.id);
    }
  }

  /****** Manipulate (Add or Modify) ******/
  const newArray = array.slice();
  if (Array.isArray(target)) {
    //multiple targets
    let nextIndex = config.indexToAdd;
    for (let i = 0; i < target.length; i++) {
      const targetIndex = newArray.findIndex(
        (item) => item.id === target[i].id,
      );
      if (targetIndex < 0) {
        //add new item
        newArray.splice(nextIndex, 0, target[i]);
      } else {
        //change existing item
        newArray[targetIndex] = target[i];
      }
      //change index
      if (config.addContinuously) {
        nextIndex = targetIndex + 1;
      } else {
        nextIndex = newArray.length;
      }
    }
    return newArray;
  } else {
    //single target
    const targetIndex = newArray.findIndex((item) => item.id === target.id);
    if (targetIndex < 0) {
      //add new item
      newArray.splice(config.indexToAdd, 0, target);
      return newArray;
    } else {
      //change existing item
      newArray[targetIndex] = target;
      return newArray;
    }
  }
};
