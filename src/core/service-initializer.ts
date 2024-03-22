import { isClass } from "../utils/comparers.util.ts";
import { getParamTypes } from "../utils/get-metadata.util.ts";
import { ConstructorContainer } from "./service-container.ts";
import { Constructor } from "./types.ts";

export class ServiceInitializer {
  static resolve(container: ConstructorContainer) {
    const instances: any[] = [];
    const constructionOrder = container.getInstanceOder();

    const matrix: Record<string, Constructor[]> = {};
    for (const constructorName of constructionOrder) {
      const constructor = container.getConstructor(constructorName);
      const paramTypes = getParamTypes(constructor) ?? [];

      const dependencies = paramTypes.filter((
        paramType,
      ): paramType is Constructor => isClass(paramType)).map((paramType) =>
        container.getConstructor(paramType.name)
      );

      matrix[constructor.name] = dependencies;
    }

    for (const [constructorName, dependencies] of Object.entries(matrix)) {
      const constructor = container.getConstructor(constructorName);
      const instance = new constructor(
        ...dependencies.map((dependency) =>
          instances.find((instance) => instance instanceof dependency)
        ),
      );

      instances.push(instance);
    }

    return instances;
  }
}
