import { SERVICE_META_KEY } from "../core/constants.ts";
import { Constructor } from "../core/types.ts";
import { getConstructorMetadataByKey } from "./get-metadata.util.ts";

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isNil(value: any): value is null | undefined {
  return isUndefined(value) || isNull(value);
}

export function isDefined(value: any): value is any {
  return !isNil(value);
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isObject(value: any): value is Object {
  return typeof value === 'object';
}

export function isTruthy(value: any): boolean {
  return !!value;
}

export function isClassInstance(value: any): boolean {
  return isDefined(value) && isObject(Object.getPrototypeOf(value));
}

export function isClass(value: any): value is Constructor {
  return isDefined(value) && isFunction(Object.getPrototypeOf(value));
}

export function isMarkedAsService(value: Constructor): boolean  {
  return isTruthy(getConstructorMetadataByKey(value, SERVICE_META_KEY));
}