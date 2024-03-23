import { ConstToEnum } from '../utils/const-to-enum.util.ts';

export const ClassTypes = {
	Service: 'jamcet:service',
	Controller: 'jamcet:controller',
} as const;

export type ClassTypeEnum = ConstToEnum<typeof ClassTypes>;

export const HttpMethodTypes = {
	Get: 'GET',
	Post: 'POST',
	Put: 'PUT',
	Delete: 'DELETE',
	Patch: 'PATCH',
	Options: 'OPTIONS',
	All: 'ALL',
} as const;

export type HttpMethodTypeEnum = ConstToEnum<typeof HttpMethodTypes>;

export const MetadataTypes = {
	HttpEndpoint: 'jamcet:controller:endpoint-type',
} as const;

export type MetadataTypeEnum = ConstToEnum<typeof MetadataTypes>;
