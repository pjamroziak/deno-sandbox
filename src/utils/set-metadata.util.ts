export function setDecoratorMetadataByKey<Value = any>(context: ClassMemberDecoratorContext, key: string, value: Value): Value {
    context.metadata[key] = value;
    return context.metadata[key] as Value;
}