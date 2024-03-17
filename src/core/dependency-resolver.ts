import { Logger } from "../common/logger.ts";
import { Constructor } from "../core/types.ts";
import { isMarkedAsService } from "../utils/comparers.util.ts";
import { getConstructorMetadataByKey } from "../utils/get-metadata.util.ts";
import { getConstructorParamTypes } from "../utils/index.ts";
import { DepdendencyConstructorStorage } from "./dependency-constructor-storage.ts";
import { DependencyExplorer } from "./dependency-explorer.ts";
import { DepdendencyInstanceStorage } from "./dependency-instance-storage.ts";

export class DependencyResolver {
  private readonly logger = new Logger(DependencyResolver.name);

  private readonly invoker: Constructor;

  private readonly explorer: DependencyExplorer;
  private readonly instanceStorage: DepdendencyInstanceStorage;
  private readonly constructorStorage: DepdendencyConstructorStorage;

  constructor(
    invoker: Constructor,
    instanceStorage: DepdendencyInstanceStorage,
    constructorStorage: DepdendencyConstructorStorage,
  ) {
    this.invoker = invoker;
    this.instanceStorage = instanceStorage;
    this.constructorStorage = constructorStorage;

    this.explorer = new DependencyExplorer();
  }

  public init() {
    const constructors = this.constructorStorage.getAll();
    const matrix = this.prepereDependencyRelationMatrix(constructors);

    for (const [dependent, dependencies] of matrix.entries()) {
      for (const dependency of dependencies) {
        this.explorer.addDependency(dependent, dependency);
      }
    }

    const dependenciesInOrder = this.explorer.explore();
    for (const dependency of dependenciesInOrder) {
      if(this.instanceStorage.has(dependency)) continue;

      const constructorArguments = getConstructorParamTypes(dependency);
      const constructorDependencies = constructorArguments.map(constructor => this.instanceStorage.get(constructor));


      const instance = this.createInstance(dependency, constructorDependencies);
      this.instanceStorage.add(instance);
    }
  }

  private prepereDependencyRelationMatrix(constructors: Constructor[]) {
    const matrix: Map<Constructor, Constructor[]> = new Map();

    for (const constructor of constructors) {
      const hasInstance = this.instanceStorage.has(constructor);
      if (hasInstance) continue;

      const isService = isMarkedAsService(constructor);
      if (!isService) {
        this.logger.error("Class isn't marked as @Service!", {
          invoker: this.invoker.name,
        }, { name: constructor.name });
        continue;
      }

      const constructorArguments = getConstructorParamTypes(constructor);
      const constructorClassDependencies = constructorArguments.filter((param): param is Constructor => isMarkedAsService(param));
      for (const constructorDependency of constructorClassDependencies) {
        if(
          !this.constructorStorage.has(constructorDependency)
          && !this.instanceStorage.has(constructorDependency)
        ) {
          throw new Error(
            `Class "${constructorDependency.name}" doesn't have created instance or isn't on the resolver list`,
          );
        }

        matrix.set(constructor, [
          ...matrix.get(constructor) ?? [],
          constructorDependency,
        ]);
      }
    }

    return matrix;
  }

  private createInstance(constructor: Constructor, deps: (Constructor | undefined)[] = []) {
    const instance = new constructor(...deps);

    this.logger.debug(`Instance of ${constructor.name} created successfully.`)
    return instance;
  }
}
