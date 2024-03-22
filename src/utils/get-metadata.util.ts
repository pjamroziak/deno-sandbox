import { Constructor } from "../core/types.ts";

export function getMetadata<Result = any>(constructor: Constructor<unknown>, key: string, propertyKey?: string): Result | undefined {
    return Reflect.getMetadata<Result>(key, constructor, propertyKey);
}

export function getParamTypes(constructor: Constructor<unknown>, propertyKey?: string): unknown[] {
    return getMetadata(constructor, "design:paramtypes", propertyKey) ?? [];
}
