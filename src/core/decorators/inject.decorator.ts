import { isUndefined } from "../../utils/comparers.util.ts";
import {
  getConstructorMetadataByKey,
  getDecoratorMetadataByKey,
} from "../../utils/get-metadata.util.ts";
import { setDecoratorMetadataByKey } from "../../utils/set-metadata.util.ts";
import { DependencyResolver } from "../dependency-resolver.ts";
import { Constructor } from "../types.ts";
import { IS_INJECTABLE_META_KEY } from "./injectable.decorator.ts";

export const TO_INJECT_META_KEY = "TO_INJECT";

export function Inject<T extends Constructor<any>>(constructor: T) {
  return function (_: unknown, ctx: ClassMemberDecoratorContext) {
    if (constructor === undefined) {
      throw new Error(
        `Field ${
          String(ctx.name)
        } has circular dependency or injecting undefined.`,
      );
    }

    const isInjectable = getConstructorMetadataByKey<boolean>(
      constructor,
      IS_INJECTABLE_META_KEY,
    );
    if (!isInjectable) {
      throw new Error(
        `Class ${constructor.name} isn\'t injectable. Missing @Injectable decorator?`,
      );
    }

    let toInject = getDecoratorMetadataByKey<string[]>(ctx, TO_INJECT_META_KEY);
    if (isUndefined(toInject)) {
      toInject = [];
      setDecoratorMetadataByKey(ctx, TO_INJECT_META_KEY, toInject);
    }

    toInject.push(constructor.name);

    return function () {
      return DependencyResolver.getInstance(constructor);
    };
  };
}
