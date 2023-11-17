import { BuildCustomSchema, CustomTypeSchema } from "../../types";

const toYupCustom = (
  json: CustomTypeSchema,
  builder: BuildCustomSchema,
  forceRequired?: boolean
) => {
  if (builder != null) {
    return builder(json, forceRequired);
  }

  return null;
};

export default toYupCustom;
