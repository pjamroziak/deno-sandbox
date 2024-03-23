import "reflection";

import { Target } from "reflection";

export function setMetadata<Value = unknown>(
  target: Target,
  key: string,
  value: Value,
  propertyKey?: string | symbol,
) {
  Reflect.defineMetadata(key, value, target, propertyKey);
}
