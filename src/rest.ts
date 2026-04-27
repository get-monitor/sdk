import { HTTPError } from './errors';
import {
	backoff,
	createURL,
	FIVE_SECONDS_IN_MS,
	isRetryableStatus,
	type RESTOptions,
	sleep,
} from './types';
import type {
	FetchOptions,
	HandleErrorOptions,
	RequestOptions,
} from './types/internal';
import { version } from './version';

const DEFAULT_RETRY_MAX = 3;

/**
 * Main class to interact with the GetMonitor API.
 */
export class REST {
	/**
	 * The options for the REST client.
	 */
	public options: RESTOptions;

	/**
	 * The headers to send with each request.
	 */
	public headers: Record<string, string>;

	constructor(options: RESTOptions | string) {
		this.options =
			typeof options === 'string' ? { auth: options } : { ...options };

		this.headers = {
			'Content-Type': 'application/json',
			'User-Agent': `GetMonitor/Node.Js (${version})`,
			Authorization: `Bearer ${this.options.auth}`,
			...this.options.headers,
		};
	}

	/**
	 * Runs a `GET` request from the API.
	 */
	public get<R>(route: string, options?: RequestOptions) {
		return this.request<R>(route, { ...options, method: 'GET' });
	}

	/**
	 * Runs a `POST` request from the API.
	 */
	public post<R>(route: string, options?: RequestOptions) {
		return this.request<R>(route, { ...options, method: 'POST' });
	}

	/**
	 * Runs a `DELETE` request from the API.
	 */
	public delete<R>(route: string, options?: RequestOptions) {
		return this.request<R>(route, { ...options, method: 'DELETE' });
	}

	/**
	 * Runs a `PUT` request from the API.
	 */
	public put<R>(route: string, options?: RequestOptions) {
		return this.request<R>(route, { ...options, method: 'PUT' });
	}

	/**
	 * Runs a `PATCH` request from the API.
	 */
	public patch<R>(route: string, options?: RequestOptions) {
		return this.request<R>(route, { ...options, method: 'PATCH' });
	}

	private async request<R>(route: string, options: FetchOptions, attempt = 0) {
		const timeout =
			options.timeout ?? this.options.timeout ?? FIVE_SECONDS_IN_MS;

		const response = await fetch(
			createURL(route, options.query, this.options.baseURL),
			{
				method: options.method,
				headers: { ...this.headers, ...options.headers },
				signal: AbortSignal.timeout(timeout),
				body: 'data' in options ? JSON.stringify(options.data) : null,
			},
		);

		if (!response.ok)
			return this.handleError<R>({
				route,
				attempt,
				options,
				response,
				method: options.method,
			});

		return (await response.json()) as R;
	}

	private async handleError<R>({
		route,
		method,
		options,
		attempt,
		response,
	}: HandleErrorOptions): Promise<R> {
		if (!isRetryableStatus(response.status)) return await response.json();

		const { retry } = this.options;

		if (attempt >= (retry?.max ?? DEFAULT_RETRY_MAX))
			throw new HTTPError(
				route,
				method,
				response.status,
				'Max retries reached',
			);

		await sleep((retry?.delay ?? backoff)(attempt));

		return this.request<R>(route, options, attempt + 1);
	}
}
