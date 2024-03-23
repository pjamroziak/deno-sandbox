import { setMetadata } from '../../utils/set-metadata.util.ts';
import { ClassTypes } from '../constants.ts';
import { Constructor } from '../types.ts';

export function Controller(target: Constructor) {
	setMetadata(target.prototype, ClassTypes.Controller, true);
}
