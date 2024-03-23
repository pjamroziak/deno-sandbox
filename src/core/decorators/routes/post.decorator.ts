import { Target } from 'reflection';
import { setMetadata } from '../../../utils/index.ts';
import { HttpMethodTypes, MetadataTypes } from '../../constants.ts';

export function Post(path: string): MethodDecorator {
	return function (
		target: Target,
		propertyKey: string | symbol,
		_descriptor: PropertyDescriptor,
	) {
		setMetadata(target, MetadataTypes.HttpEndpoint, {
			method: HttpMethodTypes.Post,
			path,
		}, propertyKey);
	};
}
