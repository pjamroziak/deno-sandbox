import { Constructor } from "../core/types.ts";

export function getConstructorMetadataByKey<Result = any>(constructor: Constructor<unknown>, key: string): Result | undefined {
    const metadata = Reflect.getMetadata<Result>(key, constructor);
    return metadata;
}

export function getConstructorParamTypes(constructor: Constructor<unknown>): any[] {
    return Reflect.getMetadata("design:paramtypes", constructor) ?? [];
}