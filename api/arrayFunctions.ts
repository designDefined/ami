import _ from "lodash";

interface WithID {
  id: string;
}

export const manipulateWithId =
  <T extends WithID>(array: T[]) =>
  (item: T, indexToAdd: number = array.length): T[] => {
    const targetIndex = _.findIndex(
      array,
      (existingItem) => existingItem.id === item.id,
    );
    if (targetIndex < 0) {
      return [
        ..._.slice(array, 0, indexToAdd),
        item,
        ..._.slice(array, indexToAdd),
      ];
    } else {
      return _.map(array, (existingItem, index) =>
        index === targetIndex ? item : existingItem,
      );
    }
  };

export const manipulateWithIds =
  <T extends WithID>(array: T[]) =>
  (items: T[]): T[] => {
    let newArray: T[] = array;
    let previouslyAddedIndex: number = array.length;
    for (let i = 0; i < items.length; i++) {
      const item: T = items[i];
      newArray = manipulateWithId(newArray)(item, index);
      const index = _.findIndex(
        newArray,
        (existingItem) => existingItem.id === item.id,
      );
      if (index >= 0) previouslyAddedIndex = index;
    }
    return newArray;
  };
