import type { RESTOptions } from './rest';

/**
 * Options used to initialize the GetMonitor client.
 */
export interface GetMonitorOptions {
	/** Resolved API secret used for authentication. */
	secret: string;

	/** Options to use in the REST client. */
	rest?: Omit<RESTOptions, 'auth'>;
}

export * from './rest';

export * from './status-page';
