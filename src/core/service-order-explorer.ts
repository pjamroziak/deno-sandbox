import { Constructor } from "./types.ts";

export class ServiceOrderExplorer {
  private readonly graph = new Map<string, string[]>();

  search(): string[] {
    const visited = new Set<string>();
    const stack: string[] = [];

    if (this.graph.size === 0) return [];

    for (const [node] of this.graph) {
      this.explore(node, visited, stack);
    }

    return stack.reverse();
  }

  addService(service: Constructor, dependencies: Constructor[] = []) {
    this.addNode(service.name);

    const dependenciesNames = dependencies.map((dependency) => dependency.name);
    for (const dependency of dependenciesNames) {
      this.addNode(dependency);
    }

    this.graph.get(service.name)!.push(...dependenciesNames);

    return this;
  }

  private explore(
    node: string,
    visited: Set<string>,
    stack: string[],
  ): void {
    if (!visited.has(node)) visited.add(node);

    const dependencies = this.graph.get(node) ?? [];
    for (const child of dependencies) {
      if (!visited.has(child)) this.explore(child, visited, stack);
    }

    if (!stack.includes(node)) stack.unshift(node);
  }

  private addNode(node: string) {
    if (!this.graph.has(node)) {
      this.graph.set(node, []);
    }
  }
}
