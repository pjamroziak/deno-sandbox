import "reflection";

import { Application } from "../src/core/application.ts";
import { Service } from "../src/core/decorators/service.decorator.ts";


@Service
class SecondService {
    private readonly test;
    constructor(test: string) {
        this.test = test;
    }
}

@Service
class FirstService {
    constructor(private readonly secondService: SecondService) {
    }
}

@Service
class ThirdService {
    constructor(private readonly dupa: string, private readonly firstService: FirstService) {
    }
}

const app = new Application();
app.addSingleton(FirstService).addSingleton(new SecondService("Please, start working")).addSingleton(ThirdService);

app.run();

console.log(app.instanceStorage.get(ThirdService));
