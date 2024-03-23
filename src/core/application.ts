import { isMarkedAsController } from '../utils/comparers.util.ts';
import { getMetadata } from '../utils/get-metadata.util.ts';
import { HttpMethodTypeEnum, MetadataTypes } from './constants.ts';
import { HttpProvider } from './http-provider.ts';
import { ConstructorContainer } from './constructor-container.ts';
import { ServiceInitializer } from './service-initializer.ts';

export class Application {
	readonly services: ConstructorContainer;

	readonly httpProvider?: HttpProvider;

	constructor(httpProvider?: HttpProvider) {
		this.services = new ConstructorContainer();
		this.httpProvider = httpProvider;
	}

	public listen(port: number) {
		const instances = ServiceInitializer.resolve(this.services);

		if (!this.httpProvider) {
			throw new Error('Missing HTTP Provider');
		}

		const controllers = instances.filter((instance) =>
			isMarkedAsController(instance)
		);

		for (const controller of controllers) {
			const prototype = Object.getPrototypeOf(controller);
			for (const method of Object.getOwnPropertyNames(prototype)) {
				if (method === 'constructor') {
					continue;
				}

				const metadata = getMetadata<
					{ method: HttpMethodTypeEnum; path: string }
				>(prototype, MetadataTypes.HttpEndpoint, method);

				if (!metadata) {
					continue;
				}

				// @ts-ignore: I don't care about type here
				const handler = controller[method].bind(controller);
				console.log(`${metadata.method}: ${metadata.path}`);
				this.httpProvider.addRoute(metadata.method, metadata.path, handler);
			}
		}

		this.httpProvider.serve(port);
	}
}
