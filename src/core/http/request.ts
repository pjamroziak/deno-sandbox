export class Req {
	headers: Record<string, string>;

	query: Record<string, string>;

	params: Record<string, string>;

	body?: object;

	constructor(
		headers: Record<string, string>,
		query: Record<string, string>,
		params: Record<string, string>,
		body?: object,
	) {
		this.headers = headers;
		this.query = query;
		this.params = params;
		this.body = body;
	}
}
