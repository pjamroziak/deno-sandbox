import { setMetadata } from "../../../utils/index.ts";
import { HttpMethodType } from "../../constants.ts";

export function Get(path: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    _descriptor: PropertyDescriptor,
  ) {
    setMetadata(target, HttpMethodType.Get, {
        path
    }, propertyKey);
  };
}
