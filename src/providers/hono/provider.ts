import { Hono } from 'hono';
import { Context } from 'https://deno.land/x/hono@v4.1.3/context.ts';
import { Req } from '../../core/http/request.ts';
import { HttpMethodTypeEnum, HttpMethodTypes } from '../../core/constants.ts';
import { HttpProvider } from '../../core/http-provider.ts';

const supportHandler = async (context: Context, method: Function) => {
	const request = new Req(
		Object.fromEntries(context.req.raw.headers),
		context.req.query(),
		context.req.param(),
		context.req.raw.body ? await context.req.json() : undefined,
	);

	const response: Response = method(request);

	return response;
};

const mapMethodToHonoMethod: Record<HttpMethodTypeEnum, string> = {
	[HttpMethodTypes.Get]: 'get',
	[HttpMethodTypes.Post]: 'post',
	[HttpMethodTypes.Patch]: 'patch',
	[HttpMethodTypes.Put]: 'put',
	[HttpMethodTypes.Delete]: 'delete',
	[HttpMethodTypes.All]: 'all',
	[HttpMethodTypes.Options]: 'options',
};

export class HonoProvider extends HttpProvider<Hono> {
	private readonly app: Hono;

	constructor() {
		super();
		this.app = new Hono();
	}

	public serve(port: number) {
		Deno.serve({ port }, this.app.fetch);
	}

	public getApplication() {
		return this.app;
	}

	public addRoute(
		method: HttpMethodTypeEnum,
		route: string,
		handler: () => void,
	) {
		const func = (c: Context) => supportHandler(c, handler);

		const methodToCall = mapMethodToHonoMethod[method];
		if (!methodToCall || !(methodToCall in this.app)) {
			throw new Error('Invalid method type');
		}

		// @ts-ignore: I don't care about type here
		this.app[methodToCall](route, func);

		return this;
	}
}
