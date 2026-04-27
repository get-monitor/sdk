import type { RESTOptions } from './rest';

/**
 * Options to use when sending a request to the API.
 */
export interface FetchOptions extends Pick<RESTOptions, 'headers' | 'timeout'> {
	/**
	 * Optional data to send in the request body (Stringified internally).
	 */
	data?: unknown;
	/**
	 * Method to use in the request.
	 */
	method: HTTPMethodLike;
	/**
	 * Query string parameters to append to the called endpoint.
	 */

	// Note: We can not use Record<string, ...> here
	query?: object;
}

/**
 * Public request options for helpers like `get`, `post` and `delete`.
 */
export type RequestOptions = Omit<FetchOptions, 'data' | 'method'>;

/**
 * Any HTTP method.
 */
export type HTTPMethodLike =
	| 'GET'
	| 'PUT'
	| 'POST'
	| 'HEAD'
	| 'PATCH'
	| 'DELETE'
	| (string & {});

/**
 * Options used when handling an error.
 *
 * @internal
 */
export interface HandleErrorOptions {
	method: string;
	route: string;
	attempt: number;
	response: Response;
	options: FetchOptions;
}
