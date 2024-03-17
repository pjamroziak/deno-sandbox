import { Constructor } from "./types.ts";
import { isDefined, isFunction } from "../utils/comparers.util.ts";
import { Logger } from "../common/logger.ts";
import { isClass } from "../utils/comparers.util.ts";


export class DepdendencyConstructorStorage {
    private readonly logger = new Logger(DepdendencyConstructorStorage.name);
    private readonly constructors: Map<string, Constructor> = new Map();

    private readonly path?: string;

    constructor(path?: string) {
        this.path = path;
    }

    public add(constructor: Constructor) {
        console.log(isDefined(constructor),typeof Object.getPrototypeOf(constructor), isFunction(typeof Object.getPrototypeOf(constructor)));
        if(!isClass(constructor)) {
            throw new Error(`[${this.path}] Value ${constructor} isn't a class`);
        }

        if(this.get(constructor.name)) {
            throw new Error(`[${this.path}] Constructor ${constructor.name} already exists`);
        }

        this.constructors.set(constructor.name, constructor);
        return this;
    }

    public get(value: string | Constructor) {
        const name = isFunction(value) ? value.name : value;
        return this.constructors.get(name);
    }

    public getAll() {
        return Array.from(this.constructors.values());
    }

    public has(value: string | Constructor) {
        const name = isFunction(value) ? value.name : value;
        return this.constructors.has(name);
    }
}