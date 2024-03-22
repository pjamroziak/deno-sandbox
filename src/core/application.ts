import { HonoProvider } from "../hono/provider.ts";
import { isMarkedAsController } from "../utils/comparers.util.ts";
import { getMetadata } from "../utils/get-metadata.util.ts";
import { ClassType, HttpMethodType } from "./constants.ts";
import { ConstructorContainer } from "./service-container.ts";
import { ServiceInitializer } from "./service-initializer.ts";

export class Application {
    readonly services: ConstructorContainer;

    constructor() {
        this.services = new ConstructorContainer();
    }

    public run() {
        const instances = ServiceInitializer.resolve(this.services);
        return instances;
    }

    public listen(honoProvider: HonoProvider) {
        const instances = ServiceInitializer.resolve(this.services);
        
        const controllers = instances.filter((instance) => isMarkedAsController(instance));

        for (const controller of controllers) {
            const prototype = Object.getPrototypeOf(controller);
            for (const method of Object.getOwnPropertyNames(prototype)) {
                if (method === "constructor") {
                    continue;
                }

                const metadata = getMetadata(prototype, HttpMethodType.Get, method);
                if(!metadata) {
                    continue;
                }

                const handler = controller[method].bind(controller);
                honoProvider.addRoute(metadata.path, handler);
            }
        }

        const entryPoint = honoProvider.getEntryPoint();

        Deno.serve({ port: 3000 }, entryPoint);
    }
}
