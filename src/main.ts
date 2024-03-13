import { Application } from "./core/application.ts";
import { Inject } from "./core/decorators/inject.decorator.ts";
import { Injectable } from "./core/decorators/injectable.decorator.ts";

@Injectable
class Dep4 {}

@Injectable
class Dep5 {
  @Inject(Dep4)
  private readonly dep4!: Dep4;
}

@Injectable
class Dep3 {
  private readonly log: string = 'ss';
}

@Injectable
class Dep2 {
  @Inject(Dep3)
  private readonly dep3!: Dep3;
}
@Injectable
class Dep {
  @Inject(Dep2)
  private readonly dep2!: Dep2;
  @Inject(Dep4)
  private readonly dep4!: Dep4;
}

@Injectable
class Test {
  @Inject(Dep3)
  private readonly dep3!: Dep3;
  @Inject(Dep)
  private readonly dep!: Dep;
}

const app = Application.create({
  providers: [Test, Dep3, Dep, Dep2, Dep4, Dep5],
});
