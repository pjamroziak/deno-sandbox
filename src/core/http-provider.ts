import { HttpMethodTypeEnum } from './constants.ts';

export abstract class HttpProvider<T = unknown> {
	public abstract serve(port: number): void;

	public abstract getApplication(): T;

	public abstract addRoute(
		method: HttpMethodTypeEnum,
		route: string,
		handler: () => void,
	): HttpProvider<T>;
}
