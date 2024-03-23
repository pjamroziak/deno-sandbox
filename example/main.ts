import { Application } from '../src/core/application.ts';
import { HonoProvider } from '../src/providers/hono/provider.ts';
import { OakProvider } from '../src/providers/oak/provider.ts';
import { HelloWorldController } from './routes/hello-world.controller.ts';
import { HelloWorldService } from './services/hello-world.service.ts';

const app = new Application(new OakProvider());

app.services
	.addSingleton(HelloWorldService)
	.addController(HelloWorldController);

app.listen(3000);
