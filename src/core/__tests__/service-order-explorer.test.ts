import { ServiceOrderExplorer } from "../service-order-explorer.ts";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { assertSnapshot } from "@std/testing/snapshot";

describe(ServiceOrderExplorer.name, () => {
  let explorer: ServiceOrderExplorer;
  beforeEach(() => {
    explorer = new ServiceOrderExplorer();
  });

  it("should return array of all necessary services, ordered by construction order", async (t) => {
    explorer
      .addService("a", ["b", "c"])
      .addService("b", ["c"])
      .addService("c", ["d"])
      .addService("d");

    await assertSnapshot(t, explorer.search());
  });

  it("should return array with one service", async (t) => {
    explorer
      .addService("d");

    await assertSnapshot(t, explorer.search());
  });

  it("should return array of all necessary services, ordered by construction order when service has circular dependency", async (t) => {
    explorer
      .addService("a", ["b", "c", "a"])
      .addService("b", ["c"])
      .addService("c", ["d"])
      .addService("d");

    await assertSnapshot(t, explorer.search());
  });
});
