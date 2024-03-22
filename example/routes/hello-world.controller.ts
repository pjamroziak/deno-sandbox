import { Context } from "https://deno.land/x/hono@v4.1.3/context.ts";
import { Controller } from "../../src/core/decorators/controller.decorator.ts";
import { Get } from "../../src/core/decorators/routes/get.decorator.ts";

@Controller
export class HelloWorldController {

    @Get("/hello-world")
    public getHelloWorld(lol: any) {
        console.log(lol);

        return {
            message: "Hello World",
        };
    }
}
