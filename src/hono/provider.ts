import { Hono } from 'hono';

export class HonoProvider {
    private readonly app: Hono

    constructor() {
        this.app = new Hono();
    }

    public getEntryPoint() {
        return this.app.fetch;
    }

    public getApplication() {
        return this.app;
    }

    public addRoute(route: string, handler: any) {
        this.app.get(route, (c) => this.convertMethodToRoute(handler, c));
        return this;
    }

    private async convertMethodToRoute(method: Function, context: any) {
        const body = await context.req.parseBody();

        const response = method({
            body,
        });

        return context.json(response);
    }
}
