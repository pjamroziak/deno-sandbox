import { ClassType } from "../core/constants.ts";
import { Constructor } from "../core/types.ts";
import { getMetadata } from "./get-metadata.util.ts";

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
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
  return typeof value === "function";
}

export function isObject(value: any): value is Object {
  return typeof value === "object";
}

export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isSymbol(value: any): value is symbol {
  return typeof value === "symbol";
}

export function isNumber(value: any): value is number {
  return typeof value === "number";
}

export function isBoolean(value: any): value is boolean {
  return typeof value === "boolean";
}

export function isPrimitive(
  value: any,
): value is string | number | boolean | symbol | null | undefined {
  return isString(value) || isNumber(value) || isBoolean(value) ||
    isSymbol(value) || isNil(value);
}

export function isTruthy(value: any): boolean {
  return !!value;
}

export function isClassInstance(value: any): boolean {
  return isDefined(value) && isObject(Object.getPrototypeOf(value));
}

export function isClass(value: any): value is Constructor {
  return isDefined(value) && !isPrimitive(value) && isFunction(Object.getPrototypeOf(value));
}

export function isMarkedAsService(value: any): value is Constructor {
  return isTruthy(getMetadata(value, ClassType.Service));
}

export function isMarkedAsController(value: any): value is Constructor {
  return isTruthy(getMetadata(value, ClassType.Controller));
}
