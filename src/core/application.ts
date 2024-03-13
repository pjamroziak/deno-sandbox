import { DependencyResolver } from "./dependency-resolver.ts";
import { Constructor } from "./types.ts";

export interface CreateApplicationOptions {
  providers: Constructor[];
}

export class Application {
  static create(options: CreateApplicationOptions) {
    const app = new Application();

    DependencyResolver.initialize(options.providers);

    return app;
  }
}
