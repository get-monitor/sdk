/**
 * Options to use in the REST class.
 */
export interface RESTOptions {
	/**
	 * Base URL to use in each request to the API.
	 */
	baseURL?: string;
	/**
	 * Authorization token for the API.
	 */
	auth: string;
	/**
	 * Timeout for requests in milliseconds (Default `5000`).
	 */
	timeout?: number;
	/**
	 * Headers to send with each request.
	 */
	headers?: Record<string, string>;
	/**
	 * Options to use when retrying failed requests.
	 */
	retry?: RetryOptions;
}

/**
 * Options used to retry a request that failed.
 */
export interface RetryOptions {
	/**
	 * Maximum number of retries to attempt.
	 */
	max: number;
	/**
	 * Delay between retries in milliseconds.
	 */
	delay?(attempt: number): number;
}

const API_PATH = '/api/v1';

export const FIVE_SECONDS_IN_MS = 5_000;

const normalizeBaseURL = (baseURL: string) => {
	let normalized = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

	if (normalized.endsWith(API_PATH))
		normalized = normalized.slice(0, -API_PATH.length);

	return normalized;
};

export const createURL = (
	route: string,
	query?: object,
	baseURL = 'https://api.example.com',
) => {
	const url = new URL(`${normalizeBaseURL(baseURL)}${API_PATH}${route}`);

	if (query) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(query)) {
			if (value === undefined) continue;

			params.append(key, String(value));
		}

		url.search = params.toString();
	}

	return url;
};

const RETRYABLE_STATUS = [408, 425, 429, 500, 502, 503, 504];

export const isRetryableStatus = (status: number) =>
	RETRYABLE_STATUS.includes(status);

const BASE_DELAY_MS = 300;
const MAX_DELAY_MS = 10_000;

/**
 * Function to calculate the delay with Jitter for retrying a request.
 */
export const backoff = (attempt: number) => {
	const exp = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** attempt);

	const jitter = Math.random() * exp * 0.3;

	return Math.floor(exp + jitter);
};

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
