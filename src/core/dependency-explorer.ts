import { Constructor } from "../core/types.ts";
import { isNil } from "../utils/comparers.util.ts";

export class DependencyExplorer {
  private readonly graph = new Map<Constructor, Constructor[]>();

  explore(): Constructor[] {
    const visited = new Set<Constructor>();
    const stack: Constructor[] = [];

    if (this.graph.size === 0) return [];

    for (const [node] of this.graph) {
      this.dfs(node, visited, stack);
    }

    this.graph.clear();

    return stack.reverse();
  }

  addDependency(from: Constructor, to?: Constructor) {
    this.addNode(from);

    if (!isNil(to)) {
      this.addNode(to);

      this.graph.get(from)!.push(to);
    }
  }

  private dfs(
    node: Constructor,
    visited: Set<Constructor>,
    stack: Constructor[],
  ): void {
    if (!visited.has(node)) visited.add(node);

    const dependencies = this.graph.get(node) ?? [];
    for (const child of dependencies) {
      this.dfs(child, visited, stack);
    }

    if(!stack.includes(node)) stack.unshift(node);
  }

  private addNode(node: Constructor) {
    if (!this.graph.has(node)) {
      this.graph.set(node, []);
    }
  }
}
