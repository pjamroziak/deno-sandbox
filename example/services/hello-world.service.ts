import { Service } from '../../src/core/decorators/service.decorator.ts';

@Service
export class HelloWorldService {
	getHelloWorld() {
		return { message: 'Hello World!' };
	}
}
