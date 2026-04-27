import type { SubscriptionUsage } from '../types';
import { BaseManager } from './Base';

export class SubscriptionManager extends BaseManager {
	public async fetch(orgId: string) {
		return this.rest.get<SubscriptionUsage>(
			`/organizations/${orgId}/subscription/usage`,
		);
	}
}
