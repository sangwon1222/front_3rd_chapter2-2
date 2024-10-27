export const findIndexById = (
  list: { id: string | number }[],
  findId: number | number
) => list.findIndex(({ id }) => id === findId);
