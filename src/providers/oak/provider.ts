import { HttpMethodTypeEnum, HttpMethodTypes } from '../../core/constants.ts';
import { HttpProvider } from '../../core/http-provider.ts';
import { Application as Oak, Context, Router } from 'oak';
import { Req } from '../../core/http/request.ts';
import { getQuery } from 'https://deno.land/x/oak@14.2.0/helpers.ts';

const supportHandler = async (context: Context, method: Function) => {
	const request = new Req(
		Object.fromEntries(context.request.headers),
		getQuery(context, { mergeParams: true }),
		'params' in context ? context.params as Record<string, string> : {},
		context.request.hasBody ? await context.request.body.json() : undefined,
	);

	const response: Response = method(request);

	context.response.body = response.body;
	context.response.headers = response.headers;
	context.response.status = response.status;
};

const mapMethodToOakMethod: Record<HttpMethodTypeEnum, string> = {
	[HttpMethodTypes.Get]: 'get',
	[HttpMethodTypes.Post]: 'post',
	[HttpMethodTypes.Patch]: 'patch',
	[HttpMethodTypes.Put]: 'put',
	[HttpMethodTypes.Delete]: 'delete',
	[HttpMethodTypes.All]: 'all',
	[HttpMethodTypes.Options]: 'options',
};

export class OakProvider extends HttpProvider<Oak> {
	private readonly app: Oak;
	private readonly router: Router;

	constructor() {
		super();
		this.app = new Oak();
		this.router = new Router();
	}

	public serve(port: number): void {
		this.app.use(this.router.routes());
		this.app.listen({ port });
	}
	public getApplication(): Oak {
		throw this.app;
	}
	public addRoute(
		method: HttpMethodTypeEnum,
		route: string,
		handler: () => void,
	): OakProvider {
		const func = (c: Context) => supportHandler(c, handler);

		const methodToCall = mapMethodToOakMethod[method];
		if (!methodToCall || !(methodToCall in this.router)) {
			throw new Error('Invalid method type');
		}

		// @ts-ignore: I don't care about type here
		this.router[methodToCall](route, func);

		return this;
	}
}
