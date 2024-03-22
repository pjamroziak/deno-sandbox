import "reflection";

import { Constructor } from "../core/types.ts";

export function setMetadata<Value = unknown>(
  constructor: Constructor,
  key: string,
  value: Value,
  propertyKey?: string | symbol,
) {
  Reflect.defineMetadata(key, value, constructor, propertyKey);
}
