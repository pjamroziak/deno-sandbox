import { Constructor } from "../core/types.ts";

export function getConstructorMetadataByKey<Result = any>(constructor: Constructor<unknown>, key: string): Result | undefined {
    const metadata = constructor[Symbol.metadata];
    if (!metadata) throw new Error(`Class ${constructor.name} doesn't have any metadata`);
    
    const decoratorMetadata = metadata[key.toString()];
    return decoratorMetadata as Result | undefined;
}

export function getDecoratorMetadataByKey<Result = any>(context: ClassMemberDecoratorContext, key: string): Result | undefined {
    const decoratorMetadata = context.metadata[key];
    return decoratorMetadata as Result | undefined;
}