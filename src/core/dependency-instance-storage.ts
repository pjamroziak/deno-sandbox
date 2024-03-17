import { Constructor } from "./types.ts";
import { isFunction } from "../utils/comparers.util.ts";
import { Logger } from "../common/logger.ts";
import { isClassInstance } from "../utils/comparers.util.ts";


export class DepdendencyInstanceStorage {
    private readonly logger = new Logger(DepdendencyInstanceStorage.name);
    private readonly instances: Map<string, any> = new Map();

    private readonly path?: string;

    constructor(path?: string) {
        this.path = path;
    }

    public add(instance: any) {
        if(!isClassInstance(instance)) {
            throw new Error(`[${this.path}] Value ${instance} isn't an instance of any class`);
        }

        const constructor = Object.getPrototypeOf(instance).constructor;

        if(this.get(constructor.name)) {
            throw new Error(`[${this.path}] Instance of class ${constructor.name} already exists`);
        }

        this.instances.set(constructor.name, instance);
        return this;
    }

    public get(value: string | Constructor) {
        const name = isFunction(value) ? value.name : value;
        return this.instances.get(name);
    }

    public getAll() {
        return Array.from(this.instances.values());
    }

    public has(value: string | Constructor) {
        const name = isFunction(value) ? value.name : value;
        return this.instances.has(name);
    }
}