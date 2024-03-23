import "reflection";

import { Target } from "reflection";

export function getMetadata<Result = unknown>(
  constructor: Target,
  key: string,
  propertyKey?: string,
): Result | undefined {
  return Reflect.getMetadata<Result>(key, constructor, propertyKey);
}

export function getParamTypes(
  constructor: Target,
  propertyKey?: string,
): unknown[] {
  return getMetadata(constructor, "design:paramtypes", propertyKey) ?? [];
}
