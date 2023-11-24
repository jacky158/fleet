/* eslint-disable @typescript-eslint/no-explicit-any */
import Render from "./Render";
import { FormBuilderSchema } from "./types";

const ElementComponent = (props: FormBuilderSchema) => {
  return <Render {...props} />;
};

export default ElementComponent;
