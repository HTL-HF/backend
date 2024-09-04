export const inArray = (array: any[], findElement: any) => {
  return array.find((element) => element === findElement) !== undefined;
};
