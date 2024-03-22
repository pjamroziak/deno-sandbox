import { Application } from "../src/core/application.ts";
import { Controller } from "../src/core/decorators/controller.decorator.ts";
import { Service } from "../src/core/decorators/service.decorator.ts";
import { HonoProvider } from "../src/hono/provider.ts";
import { HelloWorldController } from "./routes/hello-world.controller.ts";


@Controller
class F {
}

@Service
class D {
}


@Controller
class E {
    constructor(
        private readonly d: D,
        private readonly f: F,
    ) {
    }
}


@Service
class C {
}

@Service
class B {
  constructor(
    private readonly d: D,
  ) {
  }
}

@Service
class A {
  constructor(
    private readonly b: B,
    private readonly c: C,
  ) {
  }
}

const app = new Application();
app.services.addSingleton(A)
  .addSingleton(B)
  .addSingleton(C)
  .addSingleton(D)
  .addController(E)
  .addController(F)
  .addController(HelloWorldController)

app.listen(new HonoProvider());
