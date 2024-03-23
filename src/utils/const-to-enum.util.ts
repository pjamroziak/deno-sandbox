export type ConstToEnum<T extends Readonly<object>> = T[keyof T];
