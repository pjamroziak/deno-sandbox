import { Constructor } from "../core/types.ts";

export function setConstructorMetadataByKey<Value = any>(constructor: Constructor, key: string, value: Value): Value {
    Reflect.defineMetadata(key, value, constructor);
    return Reflect.getMetadata(key, constructor) as Value;
}