import { setMetadata } from '../../utils/set-metadata.util.ts';
import { ClassTypes } from '../constants.ts';
import { Constructor } from '../types.ts';

export function Service(target: Constructor) {
	setMetadata(target.prototype, ClassTypes.Service, true);
}
