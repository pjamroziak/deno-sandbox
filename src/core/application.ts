import { DependencyResolver } from "./dependency-resolver.ts";
import { Constructor } from "./types.ts";
import { DepdendencyInstanceStorage } from "./dependency-instance-storage.ts";
import { DepdendencyConstructorStorage } from "./dependency-constructor-storage.ts";
import { Logger } from "../common/logger.ts";
import { isClassInstance } from "../utils/index.ts";
import { isClass } from "../utils/comparers.util.ts";

export class Application {
  private readonly logger = new Logger(Application.name);

  readonly instanceStorage: DepdendencyInstanceStorage;
  readonly constructorStorage: DepdendencyConstructorStorage;

  private readonly resolver: DependencyResolver;

  constructor() {
    this.instanceStorage = new DepdendencyInstanceStorage("Application");
    this.constructorStorage = new DepdendencyConstructorStorage("Application");
    this.resolver = new DependencyResolver(
      Application,
      this.instanceStorage,
      this.constructorStorage,
    );
  }

  public run() {
    this.resolver.init();
    this.logger.info("Application created successfully.");
  }

  public addSingleton(value: object | Constructor) {
    if(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      throw new Error(`Value ${value} isn't class or object`);
    }

    if (isClassInstance(value)) {
      this.instanceStorage.add(value);
    } else 
    if (isClass(value)) {
      this.constructorStorage.add(value);
    }


    return this;
  }
}
