import { Constructor } from "../types.ts";

export const IS_INJECTABLE_META_KEY = 'IS_INJECTABLE';

export function Injectable<T>(_: Constructor<T>, ctx: ClassDecoratorContext) {
  ctx.metadata[IS_INJECTABLE_META_KEY] = true;
}
