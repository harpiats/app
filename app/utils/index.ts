import { ArrayUtility } from "./array";
import { ObjectUtility } from "./object";
import { StringUtility } from "./string";

export { colorize } from "./colorize";
export { DateUtility } from "./date";
export { paginate } from "./paginate";

export const Utils = {
  string: StringUtility.getInstance(),
  array: ArrayUtility.getInstance(),
  object: ObjectUtility.getInstance(),
};
