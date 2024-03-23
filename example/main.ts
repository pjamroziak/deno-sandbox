import { Application } from '../src/core/application.ts';
import { HonoProvider } from '../src/hono/provider.ts';
import { HelloWorldController } from './routes/hello-world.controller.ts';
import { HelloWorldService } from './services/hello-world.service.ts';

const app = new Application(new HonoProvider());

app.services
	.addSingleton(HelloWorldService)
	.addController(HelloWorldController);

app.listen(3000);
