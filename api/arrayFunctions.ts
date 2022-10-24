import _ from "lodash";

export const manipulateWithId =
  <T extends { id: string }>(array: T[]) =>
  (item: T, indexToAdd: number = array.length) => {
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
