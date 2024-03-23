import { setMetadata } from '../../utils/index.ts';
import { ClassTypes } from '../constants.ts';
import { Constructor } from '../types.ts';

export function Controller(target: Constructor) {
	setMetadata(target.prototype, ClassTypes.Controller, true);
}
