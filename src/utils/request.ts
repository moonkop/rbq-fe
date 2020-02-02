const NOOP = () => {
};

interface ApiParams {
	[key: string]: any[];
}

export function buildArgs(obj: any): string {
	return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

export enum HTTP_REQUEST_METHODS {
	'GET' = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PATCH' = 'PATCH',
}

interface Response {
	code: number
	msg: string
	payload: any
}

interface ApiArgs {
	host?: string,
	route?: string,
	method?: HTTP_REQUEST_METHODS,
	args?: any,
	body?: any,
	options?: object,
	callback?: (response: Response) => any
	errCallback?: (error?: any) => any

}

export const DEFAULT_HOST = 'http://localhost:8080';

export function api(
	{
		host = DEFAULT_HOST,
		route = '',
		method = HTTP_REQUEST_METHODS.GET,
		args,
		body,
		options = {},
		callback = NOOP,
		errCallback = NOOP
	}: ApiArgs): void {
	let init: RequestInit = {method, ...options,credentials:"include"}
	if (body) {
		init.body = JSON.stringify(body);
	}
	let url = host + route;
	if (args&&Object.keys(args)) {
		url += '?' + buildArgs(args);
	}
	let isSuccess = false;
	fetch(url, init).then(
		res => res.json()
	).then((response) => {
		isSuccess = true;
		if (response.code > 400) {
			errCallback(response)
		}
		callback(response)
	}).catch((err) => {
		if (!isSuccess) {
			errCallback(err);
		}
	});
}

export function apiAsync(options: ApiArgs):Promise<Response> {
	return new Promise(((resolve, reject) => {
		api({
			callback: resolve,
			errCallback: reject,
			...options
		})
	}))
}