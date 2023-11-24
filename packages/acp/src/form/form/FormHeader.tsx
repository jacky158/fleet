/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type: form.element
 * @name: FormHeader
 */

import { ElementProps, Element } from "@ikx/form-builder";
import map from "lodash/map";

export default function FormHeader({ elements }: ElementProps) {
  if (!elements) return null;

  return (
    <div>
      {map(elements, (config, key) => (
        <Element key={key.toString()} {...(config as any)} />
      ))}
    </div>
  );
}