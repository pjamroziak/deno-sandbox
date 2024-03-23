import { Controller } from '../../src/core/decorators/controller.decorator.ts';
import { Get } from '../../src/core/decorators/routes/get.decorator.ts';
import { Req } from '../../src/core/http/request.ts';
import { Post } from '../../src/core/decorators/routes/post.decorator.ts';
import { HelloWorldService } from '../services/hello-world.service.ts';

@Controller
export class HelloWorldController {
	constructor(
		private readonly service: HelloWorldService,
	) {}

	@Get()
	public get(request: Req): Response {
		const response = new Response(
			JSON.stringify(this.service.getHelloWorld()),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response;
	}

	@Post('/:id')
	public post(request: Req): Response {
		console.log(request.body);

		return new Response(null, {
			status: 202,
		});
	}
}
