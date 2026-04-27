import type { REST } from '../rest';

/**
 * Shared base resource with access to the REST client.
 */
export abstract class BaseManager {
	/**
	 * Creates a base resource wrapper.
	 */
	public constructor(public rest: REST) {}
}
