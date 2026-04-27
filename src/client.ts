import type { GetMonitorOptions } from './types';

/**
 * Main SDK client for the GetMonitor API.
 */
export class GetMonitor {
	/** Resolved options for the client. */
	public options: GetMonitorOptions;

	/**
	 * Creates a new GetMonitor client instance.
	 */
	public constructor(options: GetMonitorOptions | string) {
		this.options = typeof options === 'string' ? { secret: options } : options;
	}
}
