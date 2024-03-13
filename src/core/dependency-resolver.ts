import { Constructor } from "../core/types.ts";
import { getConstructorMetadataByKey } from "../utils/get-metadata.util.ts";
import { TO_INJECT_META_KEY } from "./decorators/inject.decorator.ts";
import { IS_INJECTABLE_META_KEY } from "./decorators/injectable.decorator.ts";
import { DependencyExplorer } from "./dependency-explorer.ts";

export class DependencyResolver {
  static readonly instances: Map<string, Constructor> = new Map();
  static readonly explorer = new DependencyExplorer();

  static initialize(constructors: Constructor[]) {
    const matrix: Map<string, string[]> = new Map();
    const constructorNames = new Set(constructors.map((constructor) => constructor.name));

    for (const constructor of constructors) {
      const isInjectable = getConstructorMetadataByKey(
        constructor,
        IS_INJECTABLE_META_KEY,
      );
      
      if (!isInjectable) {
        throw new Error(`Class ${constructor.name} isn't injectable`);
      }

      const dependencies = getConstructorMetadataByKey<string[]>(
        constructor,
        TO_INJECT_META_KEY,
      );

      if (!dependencies) {
        this.addInstance(constructor);
        matrix.set(constructor.name, []);
        continue;
      }

      for (const dependency of dependencies) {
        if(!constructorNames.has(dependency)) {
          throw new Error(`Class "${dependency}" doesn't have created instance or isn't on the resolver list`);
        }

        matrix.set(constructor.name, [...matrix.get(constructor.name) ?? [], dependency]);
      }
    }

    for (const [dependent, dependencies] of matrix.entries()) {
      for (const dependency of dependencies) {
        this.explorer.addDependency(
          constructors.find((constructor) => constructor.name === dependent)!,
          constructors.find((constructor) => constructor.name === dependency)!
        );
      }
    }

    const dependenciesInOrder = this.explorer.explore();
    for (const dependency of dependenciesInOrder) {
        if(this.hasInstance(dependency)) continue;

        this.addInstance(dependency);
    }
  }

  static hasInstance(constructor: Constructor) {
    return this.instances.has(constructor.name);
  }

  static getInstance(constructor: Constructor) {
    const instance = this.instances.get(constructor.name);
    if (!instance) 
        throw new Error(`Instance of class ${constructor.name} not found!`);

    return instance;
  }

  static addInstance(constructor: Constructor) {
    if (this.instances.has(constructor.name)) {
      throw new Error(`Instance of class ${constructor.name} already exists!`);
    }

    this.instances.set(constructor.name, new constructor());
  }
}
