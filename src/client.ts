import { OrganizationManager } from './managers/Organization';
import { StatusPageManager } from './managers/StatusPage';
import { REST } from './rest';
import type { GetMonitorOptions } from './types';

/**
 * Main SDK client for the GetMonitor API.
 */
export class GetMonitor {
	/** Resolved options for the client. */
	public options: GetMonitorOptions;

	public rest: REST;
	public pages: StatusPageManager;
	public organizations: OrganizationManager;

	/**
	 * Creates a new GetMonitor client instance.
	 */
	public constructor(options: GetMonitorOptions | string) {
		this.options = typeof options === 'string' ? { secret: options } : options;

		this.rest = new REST({
			...this.options.rest,
			auth: this.options.secret,
		});

		this.pages = new StatusPageManager(this.rest);
		this.organizations = new OrganizationManager(this.rest);
	}
}
