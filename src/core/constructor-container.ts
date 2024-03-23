import { isMarkedAsController } from '../utils/comparers.util.ts';
import { getParamTypes } from '../utils/get-metadata.util.ts';
import { isClass, isMarkedAsService } from '../utils/comparers.util.ts';
import { ServiceOrderExplorer } from './service-order-explorer.ts';
import { Constructor } from './types.ts';

export class ConstructorContainer {
	private readonly serviceOrderExplorer: ServiceOrderExplorer;
	private readonly controllers: Map<string, Constructor>;
	private readonly singletons: Map<string, Constructor>;

	constructor() {
		this.serviceOrderExplorer = new ServiceOrderExplorer();

		this.singletons = new Map();
		this.controllers = new Map();
	}

	public getInstanceOder(): string[] {
		return this.serviceOrderExplorer.search();
	}

	public getConstructor(name: string): Constructor {
		const constructor = this.singletons.get(name) ?? this.controllers.get(name);

		if (!constructor) {
			throw new Error(`Constructor with name ${name} not found`);
		}

		return constructor;
	}

	public addController(constructor: Constructor): ConstructorContainer {
		if (this.controllers.has(constructor.name)) {
			throw new Error(
				`Controller with name ${constructor.name} already exists`,
			);
		}

		if (!isClass(constructor)) {
			throw new Error(
				`${constructor} isn't class constructor`,
			);
		}

		if (!isMarkedAsController(constructor.prototype)) {
			throw new Error(
				`${constructor.name} isn't marked as a controller. Missing @Controller?`,
			);
		}

		const paramTypes = getParamTypes(constructor) ?? [];
		const dependencies = paramTypes.filter((
			paramType,
		): paramType is Constructor =>
			isClass(paramType) && isMarkedAsService(paramType.prototype)
		);

		this.serviceOrderExplorer.addService(constructor, dependencies);
		this.controllers.set(constructor.name, constructor);

		return this;
	}

	public addSingleton(constructor: Constructor): ConstructorContainer {
		if (this.singletons.has(constructor.name)) {
			throw new Error(`Singleton with name ${constructor.name} already exists`);
		}

		if (!isClass(constructor)) {
			throw new Error(
				`${constructor} isn't class constructor`,
			);
		}

		if (!isMarkedAsService(constructor.prototype)) {
			throw new Error(
				`${constructor.name} isn't marked as a service. Missing @Service?`,
			);
		}

		const paramTypes = getParamTypes(constructor) ?? [];
		const dependencies = paramTypes.filter((
			paramType,
		): paramType is Constructor =>
			isClass(paramType) && isMarkedAsService(paramType.prototype)
		);

		this.serviceOrderExplorer.addService(constructor, dependencies);
		this.singletons.set(constructor.name, constructor);

		return this;
	}
}
