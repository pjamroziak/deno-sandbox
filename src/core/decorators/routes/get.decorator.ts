import { Target } from 'reflection';
import { setMetadata } from '../../../utils/set-metadata.util.ts';
import { HttpMethodTypes, MetadataTypes } from '../../constants.ts';

export function Get(path?: string): MethodDecorator {
	return function (
		target: Target,
		propertyKey: string | symbol,
		_descriptor: PropertyDescriptor,
	) {
		setMetadata(target, MetadataTypes.HttpEndpoint, {
			method: HttpMethodTypes.Get,
			path: path ?? '/',
		}, propertyKey);
	};
}
