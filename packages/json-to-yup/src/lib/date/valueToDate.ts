import { fromUnix } from "./index";

const valueToDate = (value: string | number): null | Date => {
  if (Number.isInteger(value)) {
    return fromUnix(value as number);
  } else if (typeof value === "string") {
    return new Date(value);
  }

  return null;
};
export default valueToDate;
