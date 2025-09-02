export type ModelWithDelete = {
  delete: (args: { where: { id: number } }) => Promise<unknown>;
};

export type ModelMap = Record<string, ModelWithDelete>;
export type RecordsToDelete = Record<string, number[]>;
